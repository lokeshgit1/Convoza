import { Inngest } from "inngest";
import { connetDB } from "./db.js";
import { User } from  "../models/user.model.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

const syncUser = inngest.createFunction(
    {id: "sync-user"}, 
    {event: "clerk/user.created"},
    async ({event}) => {
        await connetDB();

        const {id, email_addresses, first_name, last_name, image_url} = event.data;
        const newUser ={
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url,
        }
        await User.create({ newUser }) 

        //todo do more thinngs here like send welcome email etc
    }
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"}, 
    {event: "clerk/user.deleted"},
    async ({event}) => {
        await connetDB();
        const {id} = event.data;
        await User.deleteOne({clerkId: id});
       // await deleteStreamUser(id.toString());

        //todo do more thinngs here like send welcome email etc
    }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser,deleteUserFromDB];