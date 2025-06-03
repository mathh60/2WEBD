import { useParams } from "react-router-dom";
import { useObjectDetailQuery } from "../Query/useObjectDetailQuery";
import "./ObjectDeatilPage.css";
import "../App.css";

export default function ObjectDetailPage() {
  const { objectId } = useParams();

  if (objectId === undefined || isNaN(parseInt(objectId))) {
    return (
      <div className="text-center text-red-500">
        Erreur: ID d'objet invalide
      </div>
    );
  }

  const intObjectID = parseInt(objectId);
  const objectDetailQuery = useObjectDetailQuery(intObjectID);

  if (objectDetailQuery.isLoading) {
    return (
      <div className="text-center text-gray-500">Chargement en cours...</div>
    );
  }

  if (objectDetailQuery.isError) {
    return (
      <div className="text-center text-red-500">
        Une erreur est survenue lors du chargement des détails de l'objet
      </div>
    );
  }

  const object = objectDetailQuery.data;

  if (!object) {
    return (
      <div className="text-center text-red-500">Erreur: Objet non trouvé</div>
    );
  }

  return (
    <div className="object-details-container bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="lg:flex">
            {object.primaryImage && (
              <div className="lg:flex-shrink-0">
                <img
                  className="object-details-image"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "400px",
                  }}
                  src={object.primaryImage}
                  alt={object.title}
                />
              </div>
            )}
            <div className="p-8 object-details-info">
              {/* Ajout du nom de l'objet ici */}
              <h2 className="text-2xl font-bold mb-4 text-center">
                {object.title}
              </h2>
              <div className="mt-6 space-y-2">
                {object.department && (
                  <p className="object-details-item text-gray-600">
                    <strong>Department:</strong> {object.department}
                  </p>
                )}
                {object.period && (
                  <p className="object-details-item text-gray-600">
                    <strong>Period:</strong> {object.period}
                  </p>
                )}
                {object.culture && (
                  <p className="object-details-item text-gray-600">
                    <strong>Culture:</strong> {object.culture}
                  </p>
                )}
                {object.objectDate && (
                  <p className="object-details-item text-gray-600">
                    <strong>Object Date:</strong> {object.objectDate}
                  </p>
                )}
                {object.medium && (
                  <p className="object-details-item text-gray-600">
                    <strong>Medium:</strong> {object.medium}
                  </p>
                )}
                {object.dimensions && (
                  <p className="object-details-item text-gray-600">
                    <strong>Dimensions:</strong> {object.dimensions}
                  </p>
                )}
                {object.accessionYear && (
                  <p className="object-details-item text-gray-600">
                    <strong>Accession Year:</strong> {object.accessionYear}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
