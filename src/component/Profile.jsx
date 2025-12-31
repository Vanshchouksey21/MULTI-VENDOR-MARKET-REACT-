

const Profile = () => {
    return (
        <div className="container mt-4">
            <div className="row">

                <div className="col-md-4">
                    <div className="card text-center shadow-sm">
                        <div className="card-body">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg"
                                alt="profile"
                                className="rounded-circle mb-3"
                                width="120"
                                height="120"
                            />
                            <h5 className="card-title">Vansh Chouksey</h5>
                            <p className="text-muted">Frontend Developer</p>
                            <p className="text-muted">vansh@email.com</p>
                            <button className="btn btn-primary btn-sm">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

               
                <div className="col-md-8">
                    {/* Personal Info */}
                    <div className="card mb-3 shadow-sm">
                        <div className="card-header fw-bold">Personal Information</div>
                        <div className="card-body">
                            <p><strong>Name:</strong> Vansh Chouksey</p>
                            <p><strong>Email:</strong> vansh@email.com</p>
                            <p><strong>Phone:</strong> +91 9876543210</p>
                            <p><strong>Role:</strong> Customer</p>
                        </div>
                    </div>


                    <div className="card shadow-sm">
                        <div className="card-header fw-bold">My Orders</div>
                        <div className="card-body">
                            <div className="border rounded p-2 mb-2">
                                <p className="mb-1"><strong>Order ID:</strong> #ORD123</p>
                                <p className="mb-1"><strong>Total:</strong> ₹2,499</p>
                                <span className="badge bg-success">Delivered</span>
                            </div>

                            <div className="border rounded p-2">
                                <p className="mb-1"><strong>Order ID:</strong> #ORD124</p>
                                <p className="mb-1"><strong>Total:</strong> ₹1,299</p>
                                <span className="badge bg-warning text-dark">Pending</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
