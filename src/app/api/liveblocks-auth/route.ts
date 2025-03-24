import { Liveblocks } from "@liveblocks/node";
import {auth , currentUser} from '@clerk/nextjs/server'
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)



const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SECRET!,
});



export async function POST(request: Request) {

  // Get the current user from your database
   
  const {sessionClaims}= await auth()   

  if(!sessionClaims){
    return new Response('unauthorized', {status:401})
  }

  const user = await currentUser()
  if(!user){
        return new Response("unauthorized", { status: 401 });

  }

  const {room} =await request.json()
const document  = await convex.query(api.document.getDocument, {id:room})

if(!document){
    return new Response("unauthorized", { status: 401 });

}

const isOwner= document.ownerId===user.id

const isOrganizationMember= document.organizationId && document.organizationId === sessionClaims.org_id

if(!isOwner && !isOrganizationMember){
    return new Response("unauthorized", { status: 401 });

}
  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    {
      userInfo: {
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl,
      },
    } // Optional
  );
  session.allow(room , session.FULL_ACCESS);

  // Authorize the user and return the result




  const { status, body } = await session.authorize();
  return new Response(body, { status });


}
