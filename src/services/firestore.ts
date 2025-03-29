
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Session service
export const sessionService = {
  // Get all sessions for a recruiter
  getSessions: async (recruiterId: string) => {
    const sessionsRef = collection(db, 'sessions');
    const q = query(
      sessionsRef, 
      where('recruiterId', '==', recruiterId),
      orderBy('timestamp', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Get a single session by ID
  getSessionById: async (sessionId: string) => {
    const docRef = doc(db, 'sessions', sessionId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      throw new Error('Session not found');
    }
    return {
      id: snapshot.id,
      ...snapshot.data()
    };
  },

  // Create a new session
  createSession: async (sessionData: any) => {
    const sessionsRef = collection(db, 'sessions');
    const docRef = await addDoc(sessionsRef, {
      ...sessionData,
      timestamp: new Date()
    });
    return docRef.id;
  },

  // Update an existing session
  updateSession: async (sessionId: string, sessionData: any) => {
    const docRef = doc(db, 'sessions', sessionId);
    await updateDoc(docRef, sessionData);
  },

  // Delete a session
  deleteSession: async (sessionId: string) => {
    const docRef = doc(db, 'sessions', sessionId);
    await deleteDoc(docRef);
  }
};

// Flagged Event service
export const flaggedEventService = {
  // Get all events for a session
  getEventsBySession: async (sessionId: string) => {
    const eventsRef = collection(db, 'flaggedEvents');
    const q = query(
      eventsRef, 
      where('sessionId', '==', sessionId),
      orderBy('timestamp', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // Create a new flagged event
  createEvent: async (eventData: any) => {
    const eventsRef = collection(db, 'flaggedEvents');
    const docRef = await addDoc(eventsRef, {
      ...eventData,
      timestamp: new Date()
    });
    return docRef.id;
  }
};
