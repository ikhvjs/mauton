import React from 'react';
import { Spinner } from "react-bootstrap";

export function LoadingBar() {
    return (
        <div className="d-flex align-items-center">
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
		    Loading...
        </div>
    );
}
