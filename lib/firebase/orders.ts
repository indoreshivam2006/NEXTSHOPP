export async function createOrder(orderData) {
  try {
    // In a real app, you would add to Firestore
    // const ordersCollection = collection(db, "orders");
    // const docRef = await addDoc(ordersCollection, {
    //   ...orderData,
    //   createdAt: new Date()
    // });
    // return docRef.id;

    // For development, just log and return a mock ID
    console.log("Order created:", orderData)
    return "order-" + Math.random().toString(36).substr(2, 9)
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export async function getOrdersByUser(userId) {
  try {
    // In a real app, you would fetch from Firestore
    // const ordersCollection = collection(db, "orders");
    // const q = query(
    //   ordersCollection,
    //   where("userId", "==", userId),
    //   orderBy("createdAt", "desc")
    // );
    // const ordersSnapshot = await getDocs(q);
    // return ordersSnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));

    // For development, return mock data
    return [
      {
        id: "order1",
        userId,
        items: [
          {
            id: "1",
            name: "Classic White T-Shirt",
            price: 29.99,
            quantity: 2,
            image: "/placeholder.svg?height=100&width=100",
          },
          {
            id: "3",
            name: "Nike Mercurial Vapor 16 Elite By You",
            price: 24500.00,
            quantity: 1,
            image: "/football shoes1.svg?height=100&width=100",
          },
        ],
        shipping: {
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "United States",
        },
        payment: {
          method: "credit-card",
          total: 149.97,
        },
        status: "delivered",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      }
    ]
  } catch (error) {
    console.error("Error getting orders:", error)
    throw error
  }
}
