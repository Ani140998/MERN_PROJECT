import { useAuth } from "../store/auth-ContextAPI"
import "../css/hover.css";
import Rating from '@mui/material/Rating';
import { CiHeart } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const { products, user } = useAuth();
    const navigate = useNavigate();

    const Save = async (p_id) => {

        try {
            if (!user) {
                toast.warning("Hii, Please Login!")
                navigate("/login");
            }
            else {
                console.log(user)
                const response = await fetch(`http://localhost:5000/api/auth/wishlist`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ user_id: user.userId, product_id: p_id })
                })

                if (response.ok) {
                    toast.success("Added to Wishlist!");
                }
                
            }
        } catch (error) {
            console.log(error)
        }

    }



    // ---------------- Rating Remarks --------------- //
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.1: 'Useless++', 1.2: 'Useless+++', 1.3: 'Useless+++', 1.4: 'Useless+++', 1.5: 'Poor', 1.6: 'Poor+', 1.7: 'Poor++', 1.8: 'Poor+++', 1.9: 'Poor+++',
        2: 'Not Good', 2.1: 'Not Good+', 2.2: 'Not Good++', 2.3: 'Not Good+++', 2.4: 'Not Good+++', 2.5: 'Average', 2.6: 'Average+', 2.7: 'Average++', 2.8: 'Average+++', 2.9: 'Average+++',
        3: 'Ok', 3.1: 'Ok+', 3.2: 'Ok++', 3.3: 'Ok++', 3.4: 'Ok+++', 3.5: 'Ok+++', 3.6: 'Good', 3.7: 'Good+', 3.8: 'Good++', 3.9: 'Good+++',
        4: 'Good+++', 4.1: 'Very Good', 4.2: 'Very Good+', 4.3: 'Very Good++', 4.4: 'Very Good+++', 4.5: 'Very Good+++', 4.6: 'Excellent', 4.7: 'Excellent+', 4.8: 'Excellent++', 4.9: 'Excellent+++',
        5: 'Excellent+++'
    };


    return (
        <>

            <div className="container">
                <div className="justify-content-center" style={{ marginTop: "10%", marginLeft: "5%" }}>
                    {/* // ------------------------- Image Slider --------------------- // */}

                    <div id="carouselExampleDark" className="carousel carousel-dark mb-4 carousel-fade border border-secondary-subtle rounded" data-bs-ride="carousel" data-bs-interval="2500" data-bs-pause="hover">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active text-center">
                                <img src="/product_1.jpg" alt="..." style={{ maxWidth: "500px", maxHeight: "350px" }} className="img-fluid mx-auto d-block" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item text-center">
                                <img src="/product_4.jpg" alt="..." style={{ width: "500px", height: "350px" }} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item text-center">
                                <img src="/product_2.jpg" alt="..." style={{ width: "500px", height: "350px" }} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    {/* // --------------------------- Shop by category -------------------------- // */}


                    <div className="row">
                        {products.map((p, index) => {
                            return (
                                <div className="col-4" key={index}>
                                    <div className="onHover card mb-4" style={{ cursor: "pointer" }}>
                                        <div className="card-body">
                                            <CiHeart style={{ float: "right", fontSize: "25px", marginBottom: "8px" }} onClick={() => Save(p._id) } />
                                            <div style={{ textAlign: "center" }}>
                                                <img src="/product_3.jpg" alt="Product_img" className="img-fluid mx-auto d-block rounded-4" style={{ maxWidth: "auto", maxHeight: "auto" }} />
                                            </div>
                                            <div style={{ textAlign: "right", marginTop: "20px" }}>
                                                <div><Rating name="half-rating-read" value={p.rating} precision={0.5} size="small" readOnly /></div>
                                                <div style={{ fontSize: '12px', color: "grey" }}>{labels[p.rating]}</div>
                                            </div>
                                            <div>
                                                <small><b>{p.brand.toUpperCase()} - {p.name}</b></small>
                                            </div>
                                            <div style={{ display: "inline" }}>
                                                <small> {p.description}</small> <small style={{ fontStyle: "italic" }}>{p.model}</small>
                                            </div>
                                            <div className="mt-3"><h6>₹{p.price}.00/-</h6></div>

                                        </div>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </>)
}