import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Url } from 'src/url/url';


const ViewService = () => {
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchService = async (id) => {
    try {
      const res = await axios.get(`${Url}/service/single-service/${id}`);
      const data = res.data;
      if (Array.isArray(data) && data.length > 0) {
        setServiceData(data[0]);
      } else {
        setError("Service not found.");
      }
    } catch (err) {
      console.error("Error fetching service:", err);
      setError("Failed to fetch service data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchService(serviceId);
    }
  }, [serviceId]);

  if (loading) {
    return <div className="viewservice-loader"><div className="spinner-border text-primary" /></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container viewservice-container mt-5">
      <div className="card viewservice-card shadow-lg">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={`${Url}/${serviceData.image}`} className="img-fluid viewservice-img" alt={serviceData.serviceName} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="viewservice-title">{serviceData.serviceName}</h2>
              <div className="viewservice-price">
                <span className="discount-price">₹{serviceData.discountPrice}</span>
                <span className="original-price">₹{serviceData.price}</span>
              </div>
              <span className={`badge ${serviceData.isActive ? 'bg-success' : 'bg-danger'}`}>
                {serviceData.isActive ? 'Active' : 'Inactive'}
              </span>
              {/* <div className="mt-3">
                <strong>Packages:</strong>
                <div className="viewservice-packages mt-2">
                  {serviceData.package.map((pkg, index) => (
                    <span className="badge rounded-pill bg-primary me-2" key={index}>
                      {pkg}
                    </span>
                  ))}
                </div>
              </div> */}
              <div className="viewservice-description mt-4" dangerouslySetInnerHTML={{ __html: serviceData.description }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewService;
