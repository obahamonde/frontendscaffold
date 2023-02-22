import { firebaseConfig } from "./config";
import * as firebase from "firebase/app";
import * as auth from "firebase/auth";
import * as db from "firebase/firestore";
import { MessageData } from "./types";

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = auth.getAuth(firebaseApp);

export const firebaseDb = db.getFirestore(firebaseApp);

export const useAuth = () => {
    const currentUser = ref<auth.User | null>(null)
    auth.onAuthStateChanged(firebaseAuth, (user) => {
        currentUser.value = user;
    }
    );
    const login = async (email: string, password: string) => {
        await auth.signInWithEmailAndPassword(firebaseAuth, email, password);
    };  
    const loginWithGoogle = async () => {
        const provider = new auth.GoogleAuthProvider();
        await auth.signInWithPopup(firebaseAuth, provider);
    };
    const loginWithGithub = async () => {
        const provider = new auth.GithubAuthProvider();
        await auth.signInWithPopup(firebaseAuth, provider);
    };

    const logout = async () => {
        await auth.signOut(firebaseAuth);
    };

    const register = async (email: string, password: string) => {
        await auth.createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const passwordReset = async (email: string) => {
        await auth.sendPasswordResetEmail(firebaseAuth, email);
    };

    return {
        currentUser,
        login,
        loginWithGoogle,
        loginWithGithub,
        logout,
        register,
        passwordReset,
    };
};


export const useFirestore = () => {

    const messages = ref<any[]>([]);

    const maxMessages = 100;

    const getMessages = async () => {
        // First let's take the Snapshot of the collection and order it by time in descending order
        const querySnapshot = db.collection(firebaseDb, "messages");
        const query = db.query(querySnapshot, db.orderBy("time", "desc"), db.limit(maxMessages));
          // Then we get the documents from the collection
         const orderedQuerySnapshot = await db.getDocs(query);   
         orderedQuerySnapshot.forEach((doc) => {
             messages.value.push(doc.data() as MessageData);
         });
    };

    db.onSnapshot(db.collection(firebaseDb, "messages"), (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                let messageList = messages.value.reverse();
                messageList.push(change.doc.data());
                messages.value = messageList.reverse();
            }
            if (change.type === "modified") {
                messages.value = messages.value.map((message) => {
                    if (message.id === change.doc.id) {
                        message = change.doc.data();
                    }
                });
            }
            if (change.type === "removed") {
                messages.value = messages.value.filter((message) => message.id !== change.doc.id);            
            }
        });
    });


    const addMessage = async (message: MessageData) => {
        if (!message.message || message.message.length < 2) {
            return;
        }
        await db.addDoc(db.collection(firebaseDb, "messages"), message);
    }

    watch(
        messages,
        (newMessages) => {
            if (newMessages.length > maxMessages) {
                messages.value = newMessages.slice(newMessages.length - maxMessages);
            }
        },
        { deep: true }
    );


    return {
        messages,
        getMessages,
        addMessage,
    };
};