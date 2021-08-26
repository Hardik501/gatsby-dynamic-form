import React from "react"
import { data } from '../utils/constant'
import { Row, Col } from 'react-bootstrap'
import { TextField, Grid, FormControlLabel, Checkbox } from '@material-ui/core'

const Form = () => {
  const handleChange = () => {}

  const getField = (item) => {
    return Object.entries(item).map((item, i) => {
      switch (item[1].valueType) {
        case "integerValue":
          return <Row>
                    <Col xs={6} md={6} lg={6}>
                      <TextField InputLabelProps={{ shrink: true }}   label={item[0]} defaultValue={item[1].integerValue} type="number"/>
                    </Col>
                  </Row>
        case "stringValue":
          return <Row>
                  <Col xs={6} md={6} lg={6}>
                    <TextField InputLabelProps={{ shrink: true }}  label={item[0]} defaultValue={item[1].stringValue}/>
                  </Col>
                </Row>
        case "booleanValue":
          return <FormControlLabel
                  control={
                    <Checkbox
                      checked={item[1].booleanValue}
                      onChange={() => {}}
                      name={item[0]}
                      color="primary"
                    />
                  }
                  label={item[0]}
                />
        case "timestampValue":
          return <FormControlLabel
                  control={<TextField label={item[0]} value={item[1].timestampValue}/>}
                  />
        default:
          return null
      }
    })
  };

  const {result:{_fieldsProto: { fields: { arrayValue: {values} } }}} = data;
  const {result:{_fieldsProto }} = data;
  return(
    <>
      <h1>{_fieldsProto.title.stringValue}</h1>
      <p>{_fieldsProto.description.stringValue}</p>
      {_fieldsProto.type.stringValue === "form" ? values.map(item => {
        const { mapValue: {fields: { xs, md, lg, sm }} } = item.mapValue.fields.gridColumns;
        return (
          <Grid xs={parseInt(xs.integerValue)}
                md={parseInt(md.integerValue)}
                lg={parseInt(lg.integerValue)}
                sm={parseInt(sm.integerValue)}
                spacing={2}
          >
            {getField(item.mapValue.fields)}
           </Grid>
        )
      }) : null}
    </>
  )
};

export default Form
