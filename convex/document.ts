import { mutation, query } from "./_generated/server";
import {ConvexError, v} from 'convex/values'
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args:{ paginationOpts: paginationOptsValidator, search: v.optional(v.string())}, 
  handler: async (ctx,  {search, paginationOpts}) => {
    const identity = await ctx.auth.getUserIdentity();

    if(!identity){
      throw new ConvexError('not authenticated')
    }

    const organizationId = (identity.organization_id ?? undefined) as string| undefined;
    
 if(search && organizationId){
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search ).eq('organizationId', organizationId)
        ).paginate(paginationOpts)
        
      }

    if(search){
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search ).eq('ownerId', identity.subject)
        ).paginate(paginationOpts)
        
    }

    if(organizationId){
          return await ctx.db
            .query("documents")
            .withIndex("by_organization_id", (q) => q.eq('organizationId', organizationId))
            .paginate(paginationOpts);

    }


    return await ctx.db.query("documents").withIndex('by_owner_id', (q)=>q.eq('ownerId' , identity.subject)).paginate(paginationOpts);

    // do something with `tasks`
  },
});

  
//return a single document 
export const getDocument = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.id);
    if(!doc){
      throw new ConvexError('Invalid Document')
    }


    return doc 
  },
});

export const create = mutation({
  args:{title: v.optional(v.string()),  initialContent: v.optional(v.string())},
  handler: async (ctx, args) => {

      const identity = await ctx.auth.getUserIdentity();
      if(identity===null){
        throw new Error("Not authenticated");
      }

              const organizationId = (identity.organization_id ?? undefined) as
                | string
                | undefined;

        
          


      return await ctx.db.insert("documents", {ownerId: identity.subject,  title: args.title ||'Untitled document' ,organizationId: organizationId, initialContent: args.initialContent });
    
  },
});

export const updateDocument = mutation({
  args:{
    id: v.id('documents'),
    title : v.optional(v.string()),
    initialContent: v.optional(v.string()), 
    
  }, handler:async (ctx, args)=>{
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) throw new Error("Not authenticated");

    const document = await ctx.db.get(args.id)

    if(!document || document.ownerId !== identity.subject){
          throw new Error("Not authorized");

    }
    return await ctx.db.patch(args.id,{...(args.title && {title: args.title}), ...(args.initialContent, {initialContent: args.initialContent})})
  }
})

export const deleteDocument = mutation({
  //todo:
  //check if the user is authorized to delete  ownerid and user.subject
  //check if document exist 
  //throw convex error if error arises

  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("document not found");
    }

    if (!identity ) {
          throw new ConvexError("User not authenticated. Try logging in again");
        } 

    if (identity.subject !== document.ownerId) {
      throw new ConvexError("you are not authorized to perform this action.");
    } 

    await ctx.db.delete(args.id);
  },
});

export const renameDocument = mutation({
  args:{id:v.id('documents'), title:v.string()}, 
  handler:async(ctx, args)=>{
        const identity = await ctx.auth.getUserIdentity();
        const document = await ctx.db.get(args.id)

        if(!document){
          throw new ConvexError('document not found')
        }
        if(!identity || identity.subject!== document.ownerId){
          throw new ConvexError('not authorized')
        } 

            return await ctx.db.patch(args.id, {
              ...(args.title && { title: args.title }),
            });


  }
})

export const getByIds= query({args:{ids: v.array(v.id('documents'))}, handler:async(ctx, {ids})=>{
  const documents =[]

  for (const id of ids){
    const document= await ctx.db.get(id)

    if(document){
      documents.push({ id: document._id, name: document.title });
    }else{
      documents.push({id,name: 'REMOVED'})
    }
  }

  return documents
  

}})


