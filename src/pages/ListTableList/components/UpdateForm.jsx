import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const UpdateForm = props => {
  const [formVals, setFormVals] = useState({
    name: props.values.name,
    desc: props.values.desc,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate(formVals);
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="target" label="Praćenje objekta">
            <Select
              style={{
                width: '100%',
              }}
            >
              <Option value="0">Tablica 1</Option>
              <Option value="1">Tablica 2</Option>
            </Select>
          </FormItem>
          <FormItem name="template" label="Predložak pravila">
            <Select
              style={{
                width: '100%',
              }}
            >
              <Option value="0">Predložak prvog pravila</Option>
              <Option value="1">Predložak drugog pravila</Option>
            </Select>
          </FormItem>
          <FormItem name="type" label="Vrsta pravila">
            <RadioGroup>
              <Radio value="0">Jako</Radio>
              <Radio value="1">Slabo</Radio>
            </RadioGroup>
          </FormItem>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <FormItem
            name="time"
            label="Vrijeme početka"
            rules={[
              {
                required: true,
                message: 'Molimo odaberite vrijeme početka!',
              },
            ]}
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Odaberite vrijeme početka"
            />
          </FormItem>
          <FormItem name="frequency" label="Razdoblje planiranja">
            <Select
              style={{
                width: '100%',
              }}
            >
              <Option value="month">mjesec</Option>
              <Option value="week">tjedan</Option>
            </Select>
          </FormItem>
        </>
      );
    }

    return (
      <>
        <FormItem
          name="name"
          label="Naziv pravila"
          rules={[
            {
              required: true,
              message: 'Unesite naziv pravila!',
            },
          ]}
        >
          <Input placeholder="Unesite potrebne podatke" />
        </FormItem>
        <FormItem
          name="desc"
          label="Opis pravila"
          rules={[
            {
              required: true,
              message: 'Unesite opis pravila s najmanje pet znakova!',
              min: 5,
            },
          ]}
        >
          <TextArea rows={4} placeholder="Unesite najmanje pet znakova" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            Prošli
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>Odustani</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Sljedeći
          </Button>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <Button
            style={{
              float: 'left',
            }}
            onClick={backward}
          >
            Prošli
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>Odustani</Button>
          <Button type="primary" onClick={() => handleNext()}>
            Sljedeći
          </Button>
        </>
      );
    }

    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>Odustani</Button>
        <Button type="primary" onClick={() => handleNext()}>
          Sljedeći
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="Konfiguracija pravila"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Steps
        style={{
          marginBottom: 28,
        }}
        size="small"
        current={currentStep}
      >
        <Step title="Osnovne informacije" />
        <Step title="Konfiguriranje svojstava pravila" />
        <Step title="Postavite razdoblje zakazivanja" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: formVals.target,
          template: formVals.template,
          type: formVals.type,
          frequency: formVals.frequency,
          name: formVals.name,
          desc: formVals.desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
