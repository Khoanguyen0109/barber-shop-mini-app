import supabase from "../client/client";

export const upsertUser = async (zaloUser) => {
  const { avatar, ...rest } = zaloUser;
  const { data } = await supabase
    .from("users")
    .select()
    .eq("idByApp", zaloUser.id);
  if (data?.length > 0) {
    return { ...data[0], avatar };
  } else {
    const { data: newUser } = await supabase
      .from("users")
      .insert({
        idByApp: zaloUser.id,
        idByOA: zaloUser.idByOA,
        name: zaloUser.name,
      })
      .select();
    return { ...newUser[0], avatar };
  }
};
