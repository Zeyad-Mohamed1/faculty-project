/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

const Model = ({ file }) => {
  const [geometry, setGeometry] = useState(null);
  const loader = useRef(new STLLoader());

  const loadFile = useCallback(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const geom = loader.current.parse(arrayBuffer);
        setGeometry(geom);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  React.useEffect(() => {
    loadFile();
  }, [file, loadFile]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#00C853" />{" "}
      {/* Changed to a matching green color */}
    </mesh>
  );
};

const STLViewerForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [cost, setCost] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".stl")) {
      setFile(selectedFile);
      setResult("");
      setCost(null);
    } else {
      alert("Please upload a valid STL file.");
    }
  };

  const handleSendToServer = async () => {
    if (!file) {
      alert("Please upload an STL file first.");
      return;
    }
    const formData = new FormData();
    formData.append("stlFile", file);

    try {
      const response = await fetch("http://localhost:5000/api/calculate-cost", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setCost(data.cost);
      setResult(`Cost of STL file processing: $${data.cost}`);
    } catch (error) {
      setResult("Error while sending file to server.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8">
      {" "}
      {/* Changed to a matching black background */}
      <h1 className="text-5xl font-bold mb-6 text-[#00C853] shadow-md">
        3D STL Viewer
      </h1>{" "}
      {/* Changed to a matching green color */}
      <input
        type="file"
        accept=".stl"
        onChange={handleFileUpload}
        className="mb-6 p-3 w-64 border-4 border-[#00C853] rounded-lg text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00C853] transition duration-300"
      />
      {file && (
        <>
          <div className="w-full h-[500px] bg-white shadow-xl rounded-lg mb-6 p-4">
            <Canvas>
              <ambientLight intensity={0.7} />
              <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <OrbitControls />
              <Model file={file} />
            </Canvas>
          </div>

          <button
            onClick={handleSendToServer}
            className="bg-[#00C853] text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#009624] focus:outline-none focus:ring-2 focus:ring-[#00C853] transition duration-300"
          >
            Calculate cost
          </button>
        </>
      )}
      {result && (
        <p className="mt-6 text-2xl text-[#00C853] font-semibold">{result}</p>
      )}
    </div>
  );
};

export default STLViewerForm;
