import * as React from 'react';
import type { ICountryProps } from './ICountryProps';
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";

interface ICountry {
  flag: string,
  name: string,
  officialName: string
}

export interface ICountryResponse {
  flags: {
    png: string;
  };
  name: {
    common: string;
    official: string
  };
}
interface ICountryState {

  countries: ICountryResponse[],
  country: ICountry
}

export default class Country extends React.Component<ICountryProps, ICountryState> {

  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: ICountryProps) {
    super(props);
    this.inputRef = React.createRef();
    this.state = { countries: [], country: { name: '', flag: '',officialName:'' } };

  }
  public async componentDidMount() {
    try {
      const response: HttpClientResponse = await this.props.myhttpClient.get('https://restcountries.com/v3.1/all?fields=name,flags', HttpClient.configurations.v1);
      const countries: ICountryResponse[] = await response.json();

      console.log("found " + countries.length)
      this.setState({ countries });
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }

  getDataHandler = async () => {

    //flatten to one dimentsion
    let mappedCountries: ICountry[] = this.state.countries.map(c => {
      let obj: ICountry = { flag: "", name: "", officialName: "" };
      obj.flag = c.flags.png
      obj.name = c.name.common
      obj.officialName = c.name.official
      return obj

    })

    console.log(mappedCountries)

    let foundCountry = mappedCountries.filter(c => c.name.toUpperCase() == this.inputRef.current?.value.toString().toUpperCase());
    console.log("found country")
    if (foundCountry.length > 0)
      this.setState({ country: foundCountry[0] })


  };

  public render(): React.ReactElement<ICountryProps> {
    return (
      <div>
        <input type='text' ref={this.inputRef} placeholder='Enter country name' />
        <button onClick={this.getDataHandler}>Get Data</button>
        <div>
          <h2>Country :{this.state.country.officialName}</h2>
          <img src={this.state.country.flag} alt={this.state.country.name} />

        </div>
      </div>
    );
  }
}
