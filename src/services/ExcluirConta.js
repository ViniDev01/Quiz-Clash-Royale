async function excluirConta(password) {
  try {
    const user = auth.currentUser;

    if (!user) {
      return { ok: false, message: "Não autenticado" };
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      password
    );

    await reauthenticateWithCredential(user, credential);

    // 🔥 Só isso
    await deleteUser(user);

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      code: error.code,
      message: error.message
    };
  }
}

export { excluirConta };