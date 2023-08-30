import { db } from "@/lib/db";

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
  let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
}

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findOne({
      $or: [
        {
          memberOneId: memberOneId,
          memberTwoId: memberTwoId
        },
        {
          memberOneId: memberTwoId,
          memberTwoId: memberOneId
        }
      ]
    });
  } catch {
    return null;
  }
}

const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.create({
      memberOneId: memberOneId,
      memberTwoId: memberTwoId,
    });
  } catch {
    return null;
  }
}
