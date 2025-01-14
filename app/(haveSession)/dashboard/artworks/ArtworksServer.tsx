import { ref } from "firebase/storage";
import ArtworksClient from "./ArtworksClient";
import { storage } from "@/datastore/firebase/firestore";

export default async function ArtworksServer() {
  // Create a storage reference from our storage service
  const storageRef = await ref(storage);

  console.log("storageRef is ", storageRef);
  return <ArtworksClient />;
}
