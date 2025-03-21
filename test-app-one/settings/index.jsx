function mySettings(props) {
    return (
      <Page>
        <Section title={<Text bold align="center">Fitbit Account</Text>}>
          <Oauth
            settingsKey="oauth"
            title="Login"
            label="Fitbit"
            status="Login"
            authorizeUrl="https://www.fitbit.com/oauth2/authorize"
            requestTokenUrl="https://api.fitbit.com/oauth2/token"
            clientId="23PKWK" 
            clientSecret="631d0e7bc5b612278bd23697590fe7b4" 
            scope="profile"
          />
        </Section>
      </Page>
    );
  }
  
  registerSettingsPage(mySettings);
  