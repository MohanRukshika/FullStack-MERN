import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
    const user = req.user;

    if (user == null) {
        return res.status(401).json({
            message: "You need to be logged in first to place the order"
        });
    }

    const orderData = {
        orderID: "ORD0000001",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        addressLineOne: req.body.addressLineOne,
        addressLineTwo: req.body.addressLineTwo,
        city: req.body.city,
        phone: req.body.phone,
        state: req.body.state,
        postalCode: req.body.postalCode,
        items: [],
        total: 0
    };

    if (req.body.firstName != null && req.body.firstName !== "") {
        orderData.firstName = req.body.firstName;
    }

    if (req.body.lastName != null && req.body.lastName !== "") {
        orderData.lastName = req.body.lastName;
    }

    try {
        const lastOrder = await Order.findOne().sort({ date: -1 });

        if (lastOrder != null) {
            const lastOrderId = lastOrder.orderID;

            const lastOrderIdInString = lastOrderId.replace("ORD", "");

            const lastOrderNumber = parseInt(lastOrderIdInString);

            const newOrderNumber = lastOrderNumber + 1;

            const newOrderNumberInString =
                String(newOrderNumber).padStart(8, "0");

            orderData.orderID = "ORD" + newOrderNumberInString;
        }

        for (let i = 0; i < req.body.items.length; i++) {
            const item = req.body.items[i];

            const product = await Product.findOne({
                productId: item.productId
            });

            if (product == null || !product.isAvailable) {
                return res.status(400).json({
                    message:
                        "Product with productId " +
                        item.productId +
                        " not found"
                });
            }

            orderData.items.push({
                product: {
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    labelPrice: product.labelPrice,
                    image: product.image[0]
                },
                quantity: item.quantity
            });

            orderData.total += product.price * item.quantity;
        }

        const newOrder = new Order(orderData);

        await newOrder.save();

        console.log(newOrder);

        return res.json({
            message: "Order created successfully"
        });

    } catch (error) {
        console.error("Error creating order:", error);

        return res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
}

export async function getOrder(req,res){
    try{

        if(req.user == null){
            res.status(401).json({
                message:"Please Login"
            })
            return
        }

        const pageSizeInString = req.params.pageSize || "10"; //how many orders should be visible in one page
        const pageNumberInString = req.params.pageNumber || "1"

        const pageSize = parseInt(pageSizeInString)
        const pageNumber = parseInt(pageNumberInString)


        if(isNaN(pageSize) || isNaN(pageNumber)){
            res.status(400).json({
                message : "Invalid page size or page number"
            })
        }

        if(req.user.isAdmin){

            const orderCount = await Order.countDocuments()
            const totalPage = Math.ceil(orderCount/pageSize)
            const orders = await Order.find().sort({date:-1}).skip((pageNumber-1)*pageSize).limit(pageSize)

            res.status(200).json({
                orders : orders,
                totalPages : totalPage,
                total: orderCount
            });

        }else{
            const orderCount = await Order.countDocuments({email:req.user.email})
            const orders = await Order.find({email:req.user.email}).sort({date:-1}).skip((pageNumber-1)*pageSize).limit(pageSize)
            res.status(200).json(orders)
        }

    }catch(error){

    }
}

export async function updateStatusAndNotes(req,res){
    if(req.user && req.user.isAdmin){
        try{
            const orderID =req.params.orderID

            await Order.findOneAndUpdate(
                {orderID:orderID},
                {status:req.body.status , notes:req.body.notes}
            )

            res.status(200).json({
            message:"Details updated successfully"
        })
        }catch(error){
            console.log(error)
        }
    }else{
        res.status(401).json({
            message:"You need to be logged in to update details"
        })
    }
}