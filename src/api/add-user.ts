import supabase from "../client/client";

export const upsertUser = async (zaloUser) => {
  const { avatar, ...rest } = zaloUser;
  const { data } = await supabase
    .from("users")
    .select()
    .eq("idByApp", zaloUser.id);
  if (data?.length > 0) {
    return { avatar, ...data[0] };
  } else {
    const { data: newUser } = await supabase
      .from("users")
      .insert({
        idByApp: zaloUser.id,
        idByOA: zaloUser.idByOA,
        name: zaloUser.name,
      })
      .select();
    return { avatar, ...newUser[0] };
  }
};
