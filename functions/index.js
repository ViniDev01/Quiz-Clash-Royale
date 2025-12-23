
import { onCall, HttpsError } from "firebase-functions/v2/https";
import auth from "firebase-functions/v1/auth";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";

// Inicializar Admin SDK
initializeApp();
const db = getFirestore();

export const verificarPoints = onCall(async (request) => {
  const { auth, data } = request;

  if (!auth) {
    throw new HttpsError('unauthenticated', 'Usuário não autenticado');
  }

  const {quizId, points} = data;
  if (!quizId || typeof points !== "number") {
    throw new HttpsError('invalid-argument', 'Parâmetros inválidos');
  }

  const userId = auth.uid;
  const userRef = db.collection("users").doc(userId);
  const userSnap = await userRef.get();

  if (!userSnap.exists) {
    throw new HttpsError(
      "not-found",
      "Usuário não encontrado."
    );
  }

  const userData = userSnap.data();
  const pointsAtuais = userData?.pointsQuizzes?.[quizId] || 0;

  // 2️⃣ Só salva se for maior
  if (points > pointsAtuais) {
    await userRef.update({
      [`pointsQuizzes.${quizId}`]: points
    });

    return {
      updated: true,
      newPoints: points
    };
  }

  return {
    updated: false,
    currentPoints: pointsAtuais
  };

});

export const atualizarPointsGeral = onCall(async ({ auth }) => {
  if (!auth) return;

  const userRef = db.collection("users").doc(auth.uid);
  const userSnap = await userRef.get();

  if (!userSnap.exists) return;

  const data = userSnap.data();
  const quizzes = data?.pointsQuizzes || {};

  const total = Object.values(quizzes).reduce((total, value) => total + value, 0);

  if (data.pointsGeral === total) {
    return {updated: false};
  }

  await userRef.update({
    pointsGeral: total,
    pointsUpdatedAt: new Date()
  });

  return {
    updated: true,
    total
  }

});

export const criarUsuario = onCall(async (request) => {
  const { data } = request;
  const { email, password, username } = data;

  if (!email || !password || !username) {
    throw new HttpsError(
      "invalid-argument",
      "Dados obrigatórios ausentes"
    );
  }

  const usernameLower = username.toLowerCase();
  const authAdmin = getAuth();

  let uid; // 👈 guardar UID pra rollback

  try {
    // 1️⃣ Criar usuário no Auth
    const userRecord = await authAdmin.createUser({
      email,
      password
    });

    uid = userRecord.uid;

    const usernameRef = db
      .collection("usernames")
      .doc(usernameLower);

    const userRef = db
      .collection("users")
      .doc(uid);

    // 2️⃣ Transaction Firestore
    await db.runTransaction(async (transaction) => {
      const usernameSnap = await transaction.get(usernameRef);

      if (usernameSnap.exists) {
        throw new HttpsError(
          "already-exists",
          "Username já existe"
        );
      }

      transaction.set(usernameRef, {
        uid,
        createdAt: FieldValue.serverTimestamp()
      });

      transaction.set(userRef, {
        username: usernameLower,
        email,
        pointsGeral: 0,
        pointsQuizzes: {},
        createdAt: FieldValue.serverTimestamp()
      });
    });

    return { success: true };

  } catch (error) {
    // 🔥 rollback do Auth
    if (uid) {
      await authAdmin.deleteUser(uid);
    }
    throw error;
  }
});

export const limparUsuario = auth.user().onDelete(async (event) => {
  const uid = event.data.uid;

  const userRef = db.collection("users").doc(uid);
  const snap = await userRef.get();

  if (snap.exists) {
    const { username } = snap.data();

    // remove username
    if (username) {
      await db.collection("usernames").doc(username).delete();
    }

    await userRef.delete();
  }
});