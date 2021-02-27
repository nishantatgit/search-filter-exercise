import { useState, useEffect } from "react";

const data = [
  {
    title: "Channel",
    key: "channel",
    type: "oneOf",
    options: [{
      key: "online",
      display: "Online"
    }, {
      key: "club",
      display: "Pick up"
    }, {
      key: "all",
      display: "All"
    }]
  },
  {
    title: "Brand",
    key: "brand",
    type: "many",
    options: [{
      key: "samsung",
      display: "Samsung"
    }, {
      key: "vizio",
      display: "Vizio"
    }, {
      key: "sony",
      display: "Sony"
    }]
  }
];


const getData = () => (
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(data);
    }, 300);
  })
);

const useQuery = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData().then(response => {
      setData(response);
      setLoading(false);
    })
  }, []);

  return { loading, data };
};


export default useQuery;
