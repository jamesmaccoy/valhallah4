import { Product, Atom } from '../lib/types'
import { collection, getDocs, getDoc, doc, where, query } from 'firebase/firestore';
import { db } from '../firebase'


export async function getAtoms(): Promise<{
  atoms: Atom[] | null
  error: string | null
}> {
  try {
    
    const atomsCollection = collection(db, 'products'); ////PRODUCTS YO
    const atomsSnapshot = await getDocs(atomsCollection);
    const atomsData = atomsSnapshot.docs.map(doc => doc.data() as Atom); // Cast to Atom
    return { atoms: atomsData, error: null };
  } catch (error) {
    return { atoms: null, error: error.message || 'Failed to fetch users' };
  }
}

export async function getAtomById(
  id: string
): Promise<{ atom: Atom | null; error: string | null }> {
  try {
const atomDocRef = doc(db, 'anatomy', id);
    const atomsSnapshot = await getDoc(atomDocRef);
    if (atomsSnapshot.exists()) {
      return { atom: atomsSnapshot.data() as Atom, error: null }; // Changed from Product to Atom
    } else {
      return { atom: null, error: 'User not found' };
    }
  } catch (error: any) {
    return { atom: null, error: error.message || 'Failed to fetch user' };
  }
}

export async function getProductsByAtomId(
  id: string
): Promise<{ products: Product[] | null; error: string | null }> { // Changed 'product' to 'Product'
  try {
    const productCollection = collection(db, 'products'); // Assuming your todos are in a 'todos' collection
    const q = query(productCollection, where('atomId', '==', id)); // Query for todos with matching userId
    const productsSnapshot = await getDocs(q);
    const productsData = productsSnapshot.docs.map(doc => doc.data() as Product);
    return { products: productsData, error: null };
  } catch (error: any) {
    return { products: null, error: error.message || 'Failed to fetch products' };
  }
}


  
  