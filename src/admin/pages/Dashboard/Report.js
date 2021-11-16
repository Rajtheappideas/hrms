import React from "react"
import MetaTags from 'react-meta-tags';
// import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap"
// import Calendar from '../Calendar'
//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"
// import "./datatables.scss"

const Report = () => {
 
  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Calendar /> */}
        <MetaTags>
          <title>Daily Report</title>3
        </MetaTags>
        <div className="container-fluid">
          {/* <Breadcrumbs maintitle="Veltrix" title="Tables" breadcrumbItem="Data Tables" /> */}
          <h3 class="text-center justify-content-center"> Daily Report</h3>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  {/* <MDBDataTable  responsive bordered data={data} /> */}

                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                    Launch demo modal
                  </button>


                  <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          ...
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>


        </div>
      </div>
    </React.Fragment>
  )
}

export default Report

