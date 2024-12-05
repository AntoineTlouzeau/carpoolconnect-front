import React from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";

const Filter = () => {
  const [enabled, setEnabled] = useState(false);
  const [enabled2, setEnabled2] = useState(false);
  const [departSlider, setDepartSlider] = useState(1);
  const [destinationSlider, setDestinationSlider] = useState(1);

  return (
    <div className="bg-white pt-5 mt-5 border-2 border-stone-500 rounded-2xl space-y-4">
      <p className="text-cobalt font-semibold m-2 text-lg -mt-1">Filtres</p>
      <hr />
      <div className="m-2 space-y-2">
        <p className="text-cobalt font-semibold">Trier par</p>
        <div>
          <input type="checkbox" />
          <label className="pl-2">Départ le plus tôt</label>
        </div>
        <div>
          <input type="checkbox" />
          <label className="pl-2">Prix le plus bas</label>
        </div>
        <div>
          <input type="checkbox" />
          <label className="pl-2">Trajet le plus court</label>
        </div>
      </div>
      <hr />
      <div className="m-2 space-y-2">
        <p className="text-cobalt font-semibold">Heure de départ</p>
        <div>
          <input type="radio" name="hour" />
          <label className="pl-2">Tout</label>
        </div>
        <div>
          <input type="radio" name="hour" />
          <label className="pl-2">Avant 06:00</label>
        </div>
        <div>
          <input type="radio" name="hour"/>
          <label className="pl-2">Entre 06:00 et 12:00</label>
        </div>
        <div>
          <input type="radio" name="hour"/>
          <label className="pl-2">Entre 12:00 et 18:00</label>
        </div>
        <div>
          <input type="radio" name="hour"/>
          <label className="pl-2">Après 18:00</label>
        </div>
      </div>
      <hr />
      <div className="m-2 space-y-2">
        <p className="text-cobalt font-semibold">Musique</p>
        <div>
          <input type="radio" name="music" />
          <label className="pl-2">Tout</label>
        </div>
        <div>
          <input type="radio" name="music"/>
          <label className="pl-2">Pop</label>
        </div>
        <div>
          <input type="radio" name="music"/>
          <label className="pl-2">Rock</label>
        </div>
        <div>
          <input type="radio" name="music"/>
          <label className="pl-2">Rap</label>
        </div>
        <div>
          <input type="radio" name="music"/>
          <label className="pl-2">Variété</label>
        </div>
        <div>
          <input type="radio" name="music"/>
          <label className="pl-2">Électro</label>
        </div>
        <div>
          <input type="radio" name="music"/>
          <label className="pl-2">Indifférent</label>
        </div>
      </div>
      <hr />
      <div className="m-2 space-y-2">
        <p className="text-cobalt font-semibold">Départ dans un rayon de :</p>
        <input type="range" min={1} max={50} className="h-0.5 w-36 mb-4" value={departSlider} onChange={(e) => setDepartSlider(e.target.value)} />
        <span className="text-sm ml-2">{departSlider} Km</span>
      </div>
      <hr />
      <div className="m-2 space-y-2">
        <p className="text-cobalt font-semibold">Arrivée dans un rayon de :</p>
        <input type="range" min={1} max={50} className="h-0.5 w-36 mb-4" value={destinationSlider} onChange={(e) => setDestinationSlider(e.target.value)} />
        <span className="text-sm ml-2">{destinationSlider} Km</span>
      </div>
      <hr />
      <div className="m-2 space-y-2">
        <p className="text-cobalt font-semibold">
          Bagages volumineux acceptés :
        </p>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
      <hr />
      <div className="m-2 space-y-2 pb-3">
        <p className="text-cobalt font-semibold">Voyage silencieux :</p>
        <Switch
          checked={enabled2}
          onChange={setEnabled2}
          className={`${
            enabled2 ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full `}
        >
          <span
            className={`${
              enabled2 ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
      
    </div>
  );
};

export default Filter;
