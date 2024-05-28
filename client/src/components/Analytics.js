import React from 'react'
import { Progress, Space } from 'antd'

const Analytics = ({allTransaction}) => {

        //Total TurnOver
        const totalTurnOver = allTransaction.reduce((acc,transaction) => acc + transaction.amount, 0)
        const totalIncomeTurnOver = allTransaction.filter((transaction) =>  transaction.type === 'Income').reduce((acc,transaction)=>acc+transaction.amount , 0)
        const totalExpenseTurnOver = allTransaction.filter((transaction) =>  transaction.type === 'Expense').reduce((acc,transaction)=>acc+transaction.amount , 0)
        const totalIncomeTurnOverPercent = (totalIncomeTurnOver / totalTurnOver)*100; 
        const totalExpenseTurnOverPercent = (totalExpenseTurnOver / totalTurnOver)*100; 
    
        //Total Transactions.
        const totalTransaction = allTransaction.length
        const totalIncomeTransaction = allTransaction.filter((transaction) => transaction.type === 'Income')
        const totalExpenseTransaction = allTransaction.filter((transaction) => transaction.type === 'Expense')
        const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100
        const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100


      //CategoryWise Income
      const totalIncomeSalary = allTransaction.filter((transaction) =>  transaction.type === 'Income' && transaction.category === 'Salary').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalIncomeTip = allTransaction.filter((transaction) =>  transaction.type === 'Income' && transaction.category === 'Tip').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalIncomeProject = allTransaction.filter((transaction) =>  transaction.type === 'Income' && transaction.category === 'Project').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalIncomeSalaryPercent = (totalIncomeSalary / totalIncomeTurnOver) * 100
      const totalIncomeTipPercent = (totalIncomeTip / totalIncomeTurnOver) * 100
      const totalIncomeProjectPercent = (totalIncomeProject / totalIncomeTurnOver) * 100
    
    
      //CategoryWise Expense
      
      const totalExpenseMovie = allTransaction.filter((transaction) =>  transaction.type === 'Expense' && transaction.category === 'Movie').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalExpenseFood = allTransaction.filter((transaction) =>  transaction.type === 'Expense' && transaction.category === 'Food').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalExpenseMedical = allTransaction.filter((transaction) =>  transaction.type === 'Expense' && transaction.category === 'Medical').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalExpenseBills = allTransaction.filter((transaction) =>  transaction.type === 'Expense' && transaction.category === 'Bills').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalExpenseFees = allTransaction.filter((transaction) =>  transaction.type === 'Expense' && transaction.category === 'Fees').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalExpenseTax = allTransaction.filter((transaction) =>  transaction.type === 'Expense' && transaction.category === 'Tax').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalExpenseClothes = allTransaction.filter((transaction) =>  transaction.type === 'Expense' && transaction.category === 'Clothes').reduce((acc,transaction)=>acc+transaction.amount , 0)
      const totalExpenseOnlineShopping = allTransaction.filter((transaction) =>  transaction.type === 'Expense' && transaction.category === 'OnlineShopping').reduce((acc,transaction)=>acc+transaction.amount , 0)
      
      const totalExpenseMoviePercent = (totalExpenseMovie / totalExpenseTurnOver) * 100
      const totalExpenseFoodPercent = (totalExpenseFood / totalExpenseTurnOver) * 100
      const totalExpenseMedicalPercent = (totalExpenseMedical / totalExpenseTurnOver) * 100
      const totalExpenseBillsPercent = (totalExpenseBills / totalExpenseTurnOver) * 100
      const totalExpenseTaxPercent = (totalExpenseTax / totalExpenseTurnOver) * 100
      const totalExpenseFeesPercent = (totalExpenseFees / totalExpenseTurnOver) * 100
      const totalExpenseCLothesPercent = (totalExpenseClothes / totalExpenseTurnOver) * 100
      const totalExpenseOnlineShoppingPercent = (totalExpenseOnlineShopping / totalExpenseTurnOver) * 100
    


    

    return (
     <>
    <div className='row m-3'>


        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total Transaction : {totalTransaction}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income : {totalIncomeTransaction.length}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTransaction.length}</h5>
                    <div>
                        <Progress type='circle' strokeColor={'green'} className="mx-2" percent={totalIncomePercent.toFixed(0)} />
                        <Progress type='circle' strokeColor={'red'} className="mx-2" percent={totalExpensePercent.toFixed(0)} />
                    </div>
                </div>    
            </div>
        </div>


        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total TurnOver : {totalTurnOver}
                </div>
                <div className='card-body'>
                    <h5 className='text-success'>Income : {totalIncomeTurnOver}</h5>
                    <h5 className='text-danger'>Expense : {totalExpenseTurnOver}</h5>
                    <div>
                        <Progress type='circle' strokeColor={'green'} className="mx-2" percent={totalIncomeTurnOverPercent.toFixed(0)} />
                        <Progress type='circle' strokeColor={'red'} className="mx-2" percent={totalExpenseTurnOverPercent.toFixed(0)} />
                    </div>
                </div>    
            </div>
        </div>


    <div className='row m-3'>

    <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total IncomeCategory : {totalIncomeTurnOver}
                </div>
                <div className='card-body'>
                    <div>
                    <Space wrap>
                        <div>
                            <div>
                                <h5>Salary</h5>
                                <Progress status='active' className='xyz'strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalIncomeSalaryPercent.toFixed(0)} />
                            </div>

                            <div>
                                <h5>Tip</h5>
                                <Progress className='xyz' status='active' strokeColor={{ from: '#108ee9', to: '#87d068', }}  percent={totalIncomeTipPercent.toFixed(0)} />
                            </div>

                            <div>
                                <h5>Project</h5>
                                <Progress status='active' className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalIncomeProjectPercent.toFixed(0)} />
                            </div>
                        </div>
                    </Space>
                    </div>
                </div>    
            </div>
        </div>


        <div className='col-md-4'>
            <div className='card'>
                <div className='card-header'>
                    Total ExpenseCategory : {totalExpenseTurnOver}
                </div>
                <div className='card-body'>
                    <div>
                        <Space wrap>
                        <div>
                         <div>
                        <h6>Bills</h6>
                        <Progress status="active"className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalExpenseBillsPercent.toFixed(0)}/>
                        </div>  
                        <div>
                        <h6>Food</h6>    
                        <Progress  status="active" className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalExpenseFoodPercent.toFixed(0)}/>
                        </div> 
                        <div>
                        <h6>Medical</h6>    
                        <Progress  status="active" className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalExpenseMedicalPercent.toFixed(0)}/>
                        </div>
                        <div>
                        <h6>Tax</h6>    
                        <Progress  status="active" className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalExpenseTaxPercent.toFixed(0)}/>
                        </div>
                        <div>
                        <h6>Clothes</h6>    
                        <Progress  status="active" className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalExpenseCLothesPercent.toFixed(0)}/>
                        </div>
                        <div>
                        <h6>OnlineShopping</h6>    
                        <Progress  status="active" className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalExpenseOnlineShoppingPercent.toFixed(0)}/>
                        </div>
                        <div>
                        <h6>Fees</h6>    
                        <Progress  status="active" className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalExpenseFeesPercent.toFixed(0)}/>
                        </div>
                        <div>
                        <h6>Movie</h6>    
                        <Progress  status="active" className='xyz' strokeColor={{ from: '#108ee9', to: '#87d068', }} percent={totalExpenseMoviePercent.toFixed(0)}/>
                        </div>
                    </div>    
                        </Space>
                    </div>
                </div>    
            </div>
        </div>


        
       
    </div>
</div>    
    </>   
  )
}

export default Analytics