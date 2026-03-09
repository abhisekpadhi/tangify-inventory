import { NextResponse, NextRequest} from "next/server";
import { doc, collection, getDocs, updateDoc, addDoc, query, where, deleteDoc } from "firebase/firestore";
import { FirebaseUtils } from '@/lib/firebaseUtils'
import { respond } from '@/lib/apiUtils';
import { TProduct } from "@/models/products";

const collectionName = "inventory_products";
const firestore = FirebaseUtils.firestore;

async function getProductsFromDB() {
  const productsRef = collection(firestore, collectionName);
  // Get all documents from the 'cities' collection
  const result: TProduct[] = []
  try {
    const querySnapshot = await getDocs(productsRef)
    querySnapshot.forEach((doc) => {
      result.push({id: doc.id, name: doc.data()?.name ?? ''})
    })
  } catch (error) {
    console.error("Error getting inventory_product docs: ", error);
  }

  return result;
}

async function updateProductInDB(product: TProduct) {
  const id = product.id
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, {
    ...product
  });
}

async function addProductToDB(product: any) {
  console.log("Adding product: ", product)
  // Search if product already exist with same `name`
  const searchResults = await searchProductByName(product.name);
  console.log("search Results: ", searchResults);
  if (searchResults.length > 0) {
    return respond(400, "Product already exists", null, false)
  }
  console.log("Product does not exists, Adding product to db");
  const productCollectionRef = collection(firestore, collectionName);
  try {
    const docRef = await addDoc(productCollectionRef, product);
    console.log("Added product document with id: ", docRef.id);
    return {id: docRef.id, ...product};
  } catch (e) {
    console.log("Error adding product, error: ", e)
  }
}

async function searchProductByName(name: string) {
  const productCollectionRef = collection(firestore, collectionName)
  const q = query(productCollectionRef, where("name", "==", name));
  const querySnapshot = await getDocs(q);
  const result: TProduct[] = []
  querySnapshot.forEach((doc) => {
    result.push({id: doc.id, name: doc.data()?.name ?? ''})
  });
  return result
}

async function deleteProductFromDB(documentId: string) {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document:", error);
  }

}

export async function GET() {
  try {
    const products = await getProductsFromDB();
    return respond(200, "Success", products, true)
    
  } catch (error) {
    console.error("Error fetching products:", error);
    return respond(500, "Failed to fetch products", null, false)
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    if (product.id) {
      await updateProductInDB(product);
      return respond(200, "Product updated successfully", product, true)
    } else {
      const newProduct = await addProductToDB(product);
      console.log("New product: ", newProduct)
      return respond(201, "Product added successfully", newProduct, true)
    }
  } catch (error) {
    console.log("Error adding/updating product:", error);
    return respond(500, "Failed to add/update product", null, false)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { productId } = await request.json();
    if (productId) {
      console.log("Deleting product id: ", productId)
      await deleteProductFromDB(productId);
      return respond(200, "Product updated successfully", null, true)
    } else {
      return respond(400, "productId is required to delete product", null, true)
    }
  } catch (error) {
    console.log("Error deleting product:", error);
    return respond(500, "Failed to delete product", null, false)
  }
}