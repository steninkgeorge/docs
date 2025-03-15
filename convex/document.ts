import { mutation, query } from "./_generated/server";
import {v} from 'convex/values'
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args:{ paginationOpts: paginationOptsValidator}, 
  handler: async (ctx, args) => {

    return await ctx.db.query("documents").paginate(args.paginationOpts);
    // do something with `tasks`
  },
});

export const create = mutation({
  args:{title: v.optional(v.string()),  initialContent: v.optional(v.string())},
  handler: async (ctx, args) => {

      const identity = await ctx.auth.getUserIdentity();
      if(identity===null){
        throw new Error("Not authenticated");
      }

      return await ctx.db.insert("documents", {ownerId: identity.subject,  title: args.title ||'Untitled document' , initialContent: args.initialContent });
    
  },
});
