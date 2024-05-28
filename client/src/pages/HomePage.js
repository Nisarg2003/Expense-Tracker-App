
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { Select, Form, Modal, Input, Table, DatePicker, message } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('all');
  const [allTransaction, setAllTransaction] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [frequency, setFrequency] = useState('all');
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined
            className='mx-2'
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className='mx-2'
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.post('https://expense-tracker-app-w90z.onrender.com/api/v1/transactions/gettransactions', {
          userid: user._id,
          category,
          frequency,
          selectedDates,
          type,
        });
        setAllTransaction(res.data);
      } catch (error) {
        console.log(error);
        toast.error('Error in getting Transactions');
      }
    };
    getAllTransaction();
  }, [frequency, selectedDates, type, category]);

  const handleDelete = async (record) => {
    try {
      await axios.post('https://expense-tracker-app-w90z.onrender.com/api/v1/transactions/deletetransaction', {
        transactionId: record._id,
      });
      message.success('Transaction Deleted');
      setAllTransaction(allTransaction.filter((transaction) => transaction._id !== record._id));
    } catch (error) {
      console.log(error);
      message.error('Unable to Delete');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      let res;
      if (editable) {
        res = await axios.post('https://expense-tracker-app-w90z.onrender.com/api/v1/transactions/edittransaction', {
          payload: { ...values, userid: user._id },
          ObjectId: editable._id,
        });
        message.success('Transaction Updated Successfully');
        setAllTransaction((prev) =>
          prev.map((transaction) => (transaction._id === editable._id ? res.data : transaction))
        );
      } else {
        res = await axios.post('https://expense-tracker-app-w90z.onrender.com/api/v1/transactions/addtransaction', {
          ...values,
          userid: user._id,
        });
        message.success('Transaction Added Successfully');
        setAllTransaction((prev) => [...prev, res.data]);
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      message.error('Failed to add transaction');
    }
  };

  return (
    <Layout>
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values)=>setfrequency(values)}>

            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='7'>Last 1 Week</Select.Option>
            <Select.Option value='30'>Last 1 Month</Select.Option>
            <Select.Option value='365'>Last 1 Year</Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDates} onChange={(values)=>setselectedDates(values)}/>}
        </div>

        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values)=>settype(values)}>
            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='Income'>Income</Select.Option>
            <Select.Option value='Expense'>Expense</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDates} onChange={(values)=>setselectedDates(values)}/>}
        </div>

        <div>
          <h6>Select Category</h6>
          <Select value={category} onChange={(values)=>setcategory(values)}>
              <Select.Option value='all'>All</Select.Option>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Tip">Tip</Select.Option>
              <Select.Option value="Project">Project</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Fees">Fees</Select.Option>
              <Select.Option value="Tax">Tax</Select.Option>
              <Select.Option value="OnlineShopping">OnlineShopping</Select.Option>
              <Select.Option value="Clothes">Clothes</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDates} onChange={(values)=>setselectedDates(values)}/>}
        </div>

          <div className='mx-2 switch-icon'>
              <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setviewData('table')} />
              <AreaChartOutlined className= {`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setviewData('analytics')} />
          </div>

        <div>
          <button className='btn btn-primary'  onClick={()=>setShowModal(true)}>
            ADD NEW
          </button>
         </div>
      </div>

      <div className='content'>
        {viewData === 'table' ?  
          <Table className='table' dataSource={allTransaction} columns={columns} />
          : <Analytics allTransaction={allTransaction} />

        }   
      </div>

      
      {/* =========================
                       Modal====================== */}
     

      <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'}  open={showModal} onCancel={()=>setShowModal(false)} footer={false}>
        <Form initialValues={editable} layout="vertical" onFinish={handleSubmit} onSubmit={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" required />
          </Form.Item>

          <Form.Item label="Type" name="type">
                <Select>
                  <Select.Option value="Income">Income</Select.Option>
                  <Select.Option value="Expense">Expense</Select.Option>
                </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
                <Select>
                  <Select.Option value="Salary">Salary</Select.Option>
                  <Select.Option value="Tip">Tip</Select.Option>
                  <Select.Option value="Project">Project</Select.Option>
                  <Select.Option value="Food">Food</Select.Option>
                  <Select.Option value="Movie">Movie</Select.Option>
                  <Select.Option value="Bills">Bills</Select.Option>
                  <Select.Option value="Medical">Medical</Select.Option>
                  <Select.Option value="Fees">Fees</Select.Option>
                  <Select.Option value="Tax">Tax</Select.Option>
                  <Select.Option value="OnlineShopping">OnlineShopping</Select.Option>
                  <Select.Option value="Clothes">Clothes</Select.Option>
                </Select>
          </Form.Item>
          <Form.Item label="Date"  name="date">
            <Input type="date" required />
          </Form.Item>
          <Form.Item label="Description"  name="description">
            <Input type="text" required/>
          </Form.Item>
          <Form.Item label="Refrence"  name="refrence">
            <Input type="text" required />
          </Form.Item>
          <div className='d-flex'>
            <button type='submit' className='btn btn-primary'>SAVE</button>
          </div>
        </Form>
      </Modal>
                




    </Layout>
  )
}

export default HomePage