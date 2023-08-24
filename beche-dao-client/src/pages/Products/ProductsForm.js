import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');




const additionalThings = [
  {
    label: 'Bill',
    name: 'bill',
  },
  {
    label: 'Warranty',
    name: 'warranty',
  },
  {
    label: 'Accessories',
    name: 'accessories',
  },
  {
    label: 'Box',
    name: 'box',
  },
];



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '90%',

  },
};



const ProductsForm = ({modalIsOpen, setIsOpen}) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    age: "",
    bill: false,
    warranty: false,
    accessories: false,
    box: false,
  
  })




  function closeModal() {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      age: "",
      bill: false,
      warranty: false,
      accessories: false,
      box: false,
    })
    setIsOpen(false);
  }

  const handleAddProduct = (event) => {
    event.preventDefault();
    console.log(formData);
    closeModal();
  }

  return (
    <div>

      <Modal
        isOpen={modalIsOpen}

        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >


        <div>

          <div className='flex justify-center'>
            <h2 className='text-xl font-bold'> ADD PRODUCT</h2>
          </div>

          <div className='text-base lg:text-lg font-medium'>

            <form onSubmit={handleAddProduct}>

              <div className='mb-5'>
                <label htmlFor="name">Name</label>
                <input className='border border-gray-600 w-full focus:outline-none focus:border-black h-7 lg:h-10 mt-1' type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className='mb-5'>
                <label htmlFor="description">Description</label>
                <textarea className='border border-gray-600 w-full focus:outline-none focus:border-black h-14 lg:h-28 mt-1' type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>


              <div className='mb-5 flex gap-8'>

                <div className='flex-1'>
                  <label htmlFor="price">Price</label>
                  <input className='border border-gray-600 w-full focus:outline-none focus:border-black h-7 lg:h-10 mt-1' type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </div>

                <div className='flex-1'>
                  <label htmlFor="age">Age</label>
                  <input className='border border-gray-600 w-full focus:outline-none focus:border-black h-7 lg:h-10 mt-1' type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    required
                  />
                </div>

                <div className='flex-1'>
                  <label htmlFor="category">Category</label>
                  <select className='block mt-1 border border-gray-600 focus:outline-none focus:border-black h-7 lg:h-10 w-full' 
                  required
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option disabled defaultValue value="">Select</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>

              </div>


              <div className='grid grid-cols-2 lg:grid-cols-4 gap-14 mb-4'>


                {additionalThings.map((item) => (
                  <label key={item.name} htmlFor={item.name}>{item.label}
                    <input
                      className='block border border-gray-600  mt-1 h-5 lg:h-10 w-5 lg:w-10 accent-sky-500'
                      type="checkbox"
                      checked={formData[item.name]}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [item.name]: e.target.checked,
                        })
                      }}

                    />
                  </label>
                ))
                }



              </div>

              <div className='flex gap-5 justify-center mt-10'>
                <button onClick={() => closeModal()} className="btn btn-outline w-32">Cancel</button>
                <button type='submit' className="btn btn-info w-32 border border-sky-500 bg-white  text-sky-500 hover:text-white">Save</button>
              </div>

            </form>

          </div>


        </div>


      </Modal>
    </div>
  );
};

export default ProductsForm;