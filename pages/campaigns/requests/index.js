import React,{useState} from "react";
import { Component } from "react";
import Layout from "../../../components/layout";
import {Button, Table,Message, Icon,Form} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/requestRow';

class RequestIndex extends Component{
  
    constructor(props) {
        super(props);
        // Non chiamre this.setState() qui!
        this.state = { hidden :true ,message:'',errormessage:'',errorhidden:true};
      }

    static async getInitialProps(props){
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequetsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) =>{
                return campaign.methods.requests(index).call()
            })
        );


        return{ address, requests, requestCount, approversCount };
    }

    changeHidden(item,message){
        this.setState({hidden:item,message:message})
    }
    
    errorMessage(item,errormessage){
        this.setState({errorhidden:item,errormessage:errormessage})
    }

    renderRow(){
        return this.props.requests.map((request, index) =>{
            return(
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                    data={
                        {hidden:this.state.hidden,
                        changeHidden:this.changeHidden.bind(this),
                        errorMessage:this.errorMessage.bind(this)
                    }
                    }
                    
                />
                
            );
        });
    }


    render(){
        const{Header, Row, HeaderCell, Body}= Table;
        return(
            <Layout>
                <h3>Request</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated='right' style={{ marginBottom:10}}>Add Request</Button>
                    </a>
                </Link>
                <Link route={`/campaigns/${this.props.address}`}>
                    <Button> Back </Button>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                     
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
       
                <Message icon  color = 'blue' hidden={this.state.hidden}>
                    <Icon name='circle notched' loading/>
                      <Message.Content>
                          <Message.Header>Please wait for the transaction to be confirmed</Message.Header>
                          {this.state.message}
                      </Message.Content>
                </Message>

                <Message error header='ERROR' content = {this.state.errormessage} hidden={this.state.errorhidden}/>


                <div>Found {this.props.requestCount} requests</div>
            </Layout>
        );
    }
}

export default RequestIndex;
