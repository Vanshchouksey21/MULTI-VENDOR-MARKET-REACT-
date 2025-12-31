import React, { useEffect, useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Customer",
  });

  // Load profile from sessionStorage
  useEffect(() => {
    const savedProfile = sessionStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setIsEditing(false); // show view mode
    } else {
      setIsEditing(true); // first time create
    }
  }, []);


  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };


  const handleSave = () => {
    sessionStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <img
                src="https://i.pravatar.cc/150"
                alt="profile"
                className="rounded-circle mb-3"
                width="120"
              />

              <h5>{profile.name || "Your Name"}</h5>
              <p className="text-muted">{profile.email || "your@email.com"}</p>

              {!isEditing && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        
        <div className="col-md-8 mt-5 mb-5">
          <div className="card shadow-sm">
            <div className="card-header fw-bold d-flex justify-content-between">
              <span>{isEditing ? "Edit Profile" : "Profile Information"}</span>

              {!isEditing && (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="card-body">
              {isEditing ? (
                <>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      className="form-select"
                      name="role"
                      value={profile.role}
                      onChange={handleChange}
                    >
                      <option>Customer</option>
                      <option>Seller</option>
                    </select>
                  </div>

                  <button className="btn btn-success" onClick={handleSave}>
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {profile.name}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                  <p><strong>Role:</strong> {profile.role}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
