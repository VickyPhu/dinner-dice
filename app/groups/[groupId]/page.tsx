"use client"

import { useParams } from "next/navigation";

export default function GroupPage() {
  const params = useParams();
  const groupId = params.groupId;

  return (
    <div>
      <h1>Group: {groupId}</h1>
    </div>
  );
}
