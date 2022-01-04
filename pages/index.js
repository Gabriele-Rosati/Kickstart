import React, {Component} from "react";
import { Card, Button,Image,Message } from "semantic-ui-react";
import factory from '../ethereum/factory';
import Layout from '../components/layout';
import {Link} from '../routes';



class CampaignIndex extends Component{


    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return{ campaigns };

    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return{
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>),
                fluid:true
            }
        });

        return <Card.Group items ={items} />;
    }


    render(){
       return(
        <Layout>
            <Image src ='/images/download.png'  href ='https://metamask.io/download.html' bordered size ='small'/>
            <Message>
                <Message.Header>Metamask Required</Message.Header>
                <p>
                    Please make sure you have installed metamsk before using this app.
                    You can click on the metamask icon to start the download.
                </p>
            </Message>
            <div>
             <h3>Open Campaigns</h3>
             <Link route='/campaigns/new'>
                <a>
                    <Button
                        floated = 'right'
                        content = 'Create Camapign'
                        icon = 'add circle'
                        primary = {true}
                    />
                </a>
            </Link>
            {this.renderCampaigns()}
         </div>
        </Layout>
        );
    }
}


export default CampaignIndex;