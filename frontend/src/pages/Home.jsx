import {useState, useEffect} from "react"
import Product from "../components/Product";
import "../styles/Home.css"
import api from "../api"
import LoadingIndicator from "../components/LoadingIndicator";

function Home() {
    const [products, setProducts] = useState([]);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getProducts();
    }, []);

    const getProducts = () => {
        setLoading(true);
        api.get("/products/")
        .then((res) => res.data)
        .then((data) => {
            setProducts(data);
        })
        .catch((err) => alert(err))
        .finally(() => setLoading(false));
    };

    const deleteProduct = (id) => {
        api.delete(`/products/delete/${id}/`, {},
            {withCredentials: true}
        )
        .then((res) => {
            if (res.status == 204) alert("Product deleted!");
            else alert("Failed to delete note.");
            getProducts();
        }).catch((error) => alert(error));
    }

    const createProduct = (e) => {
        e.preventDefault();
        api.post("/my-products/", {description, title, price})
        .then((res) => {
            if (res.status === 201) alert("Product created!");
            else alert("Failed to create product.");
            getProducts();
        })
        .catch((err)=>alert(err));
    }

    return <div>
        <div>
            <h2>Products</h2>
            {loading && <LoadingIndicator/>}
            {products.map((product) => (
                <Product product={product} onDelete={deleteProduct} key={product.id} />
            ))}
        </div>
        <h2>Create a Product</h2>
        <form onSubmit={createProduct}>
            <label htmlFor="title">Title:</label>
            <br/>
            <input type="text" id="title" value={title} required onChange={(e) => setTitle(e.target.value)}/>
            <br/>
            <label htmlFor="title">Description:</label>
            <br/>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <br/>
            <label htmlFor="price">Price:</label>
            <br/>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <br/>
            <input type="submit" value="Create"/>
        </form>
    </div>
}

export default Home