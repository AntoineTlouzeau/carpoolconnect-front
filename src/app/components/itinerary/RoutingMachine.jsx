import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// eslint-disable-next-line no-unused-vars
const createRoutineMachineLayer = (props) => {
    const { waypoints } = props;

    const instance = L.Routing.control({
        waypoints,
        show: false,
        position: "bottomright",
        lineOptions: {
            styles: [
                {
                    color: "#757de8",
                },
            ],
        },
    });
    return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;
