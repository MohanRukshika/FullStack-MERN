import {Link} from "react-router-dom";
import { addToCart } from "../utils/cart";

export default function ProductCard(props) {
    const product = props.product

    return (
        <Link to={"/overview/"+product.productId} state={product}>
        <div className="w-[300px] overflow-hidden rounded-2xl border border-[#05373D]/15 bg-white shadow-md m-[25px]">
            
            <div className="group relative h-[300px] w-[300px] overflow-hidden bg-white">
                {/* First image */}
                <img
                    className=" cursor-pointer absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                    src={product.image[0]}
                    alt={"Image of " + product.name}
                />

                {/* Second image */}
                <img
                    className="cursor-pointer absolute top-0 left-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    src={product.image[1]}
                    alt={"Image of " + product.name}
                />
            </div>

            <div className="p-5">
                <h3 className="mb-2 text-center font-semibold text-[#230603]">
                    {product.name}
                </h3>

                <div className="mb-4 flex items-center gap-15">
                <p className="text-lg font-bold text-[#5c060d]">
                    LKR {product.price}
                </p>

                <p className="text-sm text-[#230603]/60 line-through">
                    LKR {product.labelPrice}
                </p>
</div>

                <button className="w-full rounded-xl bg-accent px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-secondary hover:shadow-lg active:scale-95" onClick={()=>{addToCart(product,1)}}>
                    Add to Cart
                </button>
            </div>
        </div>
        </Link>
    )
}
