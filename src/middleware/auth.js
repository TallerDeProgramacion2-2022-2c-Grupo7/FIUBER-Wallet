const admin = require("firebase-admin");
const config = require("../config");

const firebaseConfig = {
  projectId: config.firebase.projectId,
  privateKey: config.firebase.privateKey,
  clientEmail: config.firebase.clientEmail,
};

if (!admin.apps.length) {
  /** See https://stackoverflow.com/a/57764002/2516673 */
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
    credential: admin.credential.cert(firebaseConfig),
  });
}

const auth = admin.auth();

const firebaseAuth = async (req, res) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Error("Unauthorized");
    }
    const token = await auth.verifyIdToken(authorization);
    req.user = await auth.getUser(token.uid);
  } catch (error) {
    throw new Error(error.info);
  }
};

module.exports = firebaseAuth;
