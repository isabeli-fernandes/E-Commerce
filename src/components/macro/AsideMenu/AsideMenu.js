import React from "react";
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

function AsideMenu() {
    const history = useHistory();

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light col-md-3 col-12">
                <Navigation
                    activeItemId="/dashboard"
                    onSelect={({ itemId }) => {
                    history.push(itemId);
                }}
                items={[
                    {
                        title: 'Meus Dados',
                        itemId: "/dashboard/formuser"
                    },
                    {
                        title: 'Meus Endereços',
                        itemId: "/dashboard/address"

                    },
                    {
                        title: 'Meus Pedidos',
                        itemId: "/dashboard/myorder"

                    },
                    {
                        title: 'Ajuda',
                        itemId: '/contact',

                    },

                ]}
                />
            </div>
        </>
    );
}
export default AsideMenu