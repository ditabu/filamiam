import React from "react";
import { Grid } from "semantic-ui-react";
import { Outlet } from "react-router-dom";

export default function Layout({user}) {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Outlet />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }