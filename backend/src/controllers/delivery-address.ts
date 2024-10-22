// const deliveryAddress = new DeliveryAddressModel({
//     user: "670fbb69f9f7afb30d4f5d4f",
//     street: "rue de la paix",
//     city: "Paris",
//     postalCode: "75000",
//     country: "France",
//   })
  
//   deliveryAddress.save();
  
//   console.log(deliveryAddress.id);
  
//   const getDeliveryAddress = async (addressId: string) => {
//     try {
//       const deliveryAddress = await DeliveryAddressModel.findById(addressId).populate("user");
  
//       if (!deliveryAddress) {
//         console.log("Adresse de livraison non trouvée");
//         return;
//       }
  
//       const user = deliveryAddress.user;
  
//       console.log(user);
//     } catch (error) {
//       console.error("Erreur lors de la recherche de l'adresse de livraison", error);
//     }
//   }
  
//   getDeliveryAddress(deliveryAddress.id);