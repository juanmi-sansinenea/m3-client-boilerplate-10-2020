import axios from "axios";


// THIS IS AN EXAMPLE THAT YOU CAN USE 
// TO CREATE A SERVICE FOR YOUR AXIOS CALLS
class ClassService {
  constructor() {
    // this.api  is a reusable base of the request containing the base url (baseURL) 
    // of the API and the options ( `withCredentials: true` )
    this.api = axios.create({        
      baseURL: "http://localhost:5000/api",
      withCredentials: true
    });
  }

  getAll = () => {
    const pr = this.api.get('/classes')

    return pr;
  }

  getOne = (id) => {
    const pr = this.api.get(`/classes/${id}`)

    return pr;
  }

  create = (id, data) => {
    const pr = this.api.post(`/classes/${id}`, data )

    return pr;
  }

  deleteOne = (id) => {
    const pr = this.api.delete(`/classes/${id}` )

    return pr;
  }

}

// Create instance (object) containing all axios calls as methods
const classService = new ClassService();

export default classService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.