import { db, collection, addDoc } from './firebase.js';

const addCertificates = async () => {
  const certificates = [
    {
      title: "Java Programming",
      issuer: "Udemy",
      date: "2024",
      image: "/images/certificates/java-udemy.jpg",
      link: "#"
    },
    {
      title: "Data Analytics Essential",
      issuer: "Cisco Networking Academy",
      date: "2024",
      image: "/images/certificates/cisco-data-analytics.jpg",
      link: "#"
    },
    {
      title: "Introduction to Cloud",
      issuer: "IBM",
      date: "2025",
      image: "/images/certificates/ibm-cloud.jpg",
      link: "#"
    }
  ];

  try {
    for (const cert of certificates) {
      await addDoc(collection(db, 'certificates'), cert);
      console.log(`Added certificate: ${cert.title}`);
    }
    console.log('All certificates added successfully!');
  } catch (error) {
    console.error('Error adding certificates: ', error);
  }
};

addCertificates();
