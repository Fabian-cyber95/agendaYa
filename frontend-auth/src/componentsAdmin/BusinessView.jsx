import React from "react";

const BusinessView = ({ business }) => {
  if (!business) {
    return (
      <p className="text-gray-600 dark:text-gray-300 italic">
        No tienes un negocio registrado.
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md space-y-2">
      <h3 className="text-xl font-bold text-blue-600 dark:text-yellow-400">
        {business.name}
      </h3>
      <p><strong>Descripción:</strong> {business.description}</p>
      <p><strong>Ubicación:</strong> {business.location}</p>

      <div>
        <strong>Personal:</strong>
        <ul className="list-disc ml-6">
          {business.staff?.length > 0 ? (
            business.staff.map((person, i) => (
              <li key={i}>{person}</li>
            ))
          ) : (
            <li>No hay personal registrado</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BusinessView;
