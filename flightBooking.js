import { LightningElement } from 'lwc';

export default class FlightBooking extends LightningElement { 
    name = '';
    email = '';
    phone = '';
    departureCity = '';
    arrivalCity = '';
    departureDate = '';
    returnDate = '';
    preferedAirline = '';
    departureCityCode = '';
    arrivalCityCode = '';
    SelectedAirlineCode = '';

    // Boolean to show/hide loading spinner
    isSearchFlightLoading = false;

    // Placeholder for available flight data
    availableFlights = null;

    // Options for the Preferred Airline dropdown
    preferedAirlineOptions = [
        { label: 'Pakistan International Airlines', value: 'PIA' },
        { label: 'American Airlines', value: 'AA' },
        { label: 'Delta Air Lines', value: 'DL' },
        { label: 'United Airlines', value: 'UA' },
        { label: 'Air Canada', value: 'AC' },
        { label: 'British Airways', value: 'BA' },
        { label: 'Lufthansa', value: 'LH' },
        { label: 'Qatar Airways', value: 'QR' },
        { label: 'Emirates', value: 'EK' },
        { label: 'Etihad Airways', value: 'EY' },
        { label: 'Singapore Airlines', value: 'SQ' },
        { label: 'Cathay Pacific', value: 'CX' },
        { label: 'Turkish Airlines', value: 'TK' },
        { label: 'KLM Royal Dutch Airlines', value: 'KL' },
        { label: 'Air France', value: 'AF' },
        { label: 'Qantas Airways', value: 'QF' },
        { label: 'Japan Airlines', value: 'JL' },
        { label: 'ANA (All Nippon Airways)', value: 'NH' },
        { label: 'Swiss International Air Lines', value: 'LX' },
        { label: 'Southwest Airlines', value: 'WN' },
        { label: 'JetBlue Airways', value: 'B6' },
        { label: 'Alaska Airlines', value: 'AS' },
        { label: 'Hawaiian Airlines', value: 'HA' },
        { label: 'Aeroméxico', value: 'AM' },
        { label: 'Avianca', value: 'AV' },
        { label: 'LATAM Airlines', value: 'LA' },
        { label: 'Aeroflot', value: 'SU' },
        { label: 'Finnair', value: 'AY' },
        { label: 'Iberia', value: 'IB' },
        { label: 'Virgin Atlantic', value: 'VS' },
        { label: 'Ethiopian Airlines', value: 'ET' },
        { label: 'Kenya Airways', value: 'KQ' },
        { label: 'South African Airways', value: 'SA' },
        { label: 'EgyptAir', value: 'MS' },
        { label: 'Royal Air Maroc', value: 'AT' },
        { label: 'RwandAir', value: 'WB' },
        { label: 'Air India', value: 'AI' },
        { label: 'IndiGo', value: '6E' },
        { label: 'SpiceJet', value: 'SG' },
        { label: 'Go First', value: 'G8' },
        { label: 'Vistara', value: 'UK' },
        { label: 'AirAsia', value: 'AK' },
        { label: 'Malaysia Airlines', value: 'MH' },
        { label: 'Thai Airways', value: 'TG' },
        { label: 'Bangkok Airways', value: 'PG' },
        { label: 'Philippine Airlines', value: 'PR' },
        { label: 'Cebu Pacific', value: '5J' },
        { label: 'Vietnam Airlines', value: 'VN' },
        { label: 'Garuda Indonesia', value: 'GA' },
        { label: 'Lion Air', value: 'JT' },
        { label: 'Korean Air', value: 'KE' },
        { label: 'Asiana Airlines', value: 'OZ' },
        { label: 'China Airlines', value: 'CI' },
        { label: 'EVA Air', value: 'BR' },
        { label: 'Air China', value: 'CA' },
        { label: 'China Eastern Airlines', value: 'MU' },
        { label: 'China Southern Airlines', value: 'CZ' },
        { label: 'Hainan Airlines', value: 'HU' },
        { label: 'Shanghai Airlines', value: 'FM' },
        { label: 'Air New Zealand', value: 'NZ' },
        { label: 'Fiji Airways', value: 'FJ' },
        { label: 'TAP Air Portugal', value: 'TP' },
        { label: 'Azores Airlines', value: 'S4' },
        { label: 'Ryanair', value: 'FR' },
        { label: 'EasyJet', value: 'U2' },
        { label: 'Norwegian Air Shuttle', value: 'DY' },
        { label: 'Wizz Air', value: 'W6' },
        { label: 'Vueling Airlines', value: 'VY' },
        { label: 'Air Europa', value: 'UX' },
        { label: 'SAS (Scandinavian Airlines)', value: 'SK' },
        { label: 'LOT Polish Airlines', value: 'LO' },
        { label: 'Aegean Airlines', value: 'A3' },
        { label: 'El Al Israel Airlines', value: 'LY' },
        { label: 'Saudi Arabian Airlines', value: 'SV' },
        { label: 'Flydubai', value: 'FZ' },
        { label: 'Air Arabia', value: 'G9' },
        { label: 'Kuwait Airways', value: 'KU' },
        { label: 'Oman Air', value: 'WY' },
        { label: 'Royal Jordanian', value: 'RJ' },
        { label: 'Gulf Air', value: 'GF' },
        { label: 'SriLankan Airlines', value: 'UL' },
        { label: 'Brussels Airlines', value: 'SN' },
        { label: 'Croatia Airlines', value: 'OU' },
        { label: 'Air Serbia', value: 'JU' },
        { label: 'Alitalia', value: 'AZ' },
        { label: 'Air Baltic', value: 'BT' },
        { label: 'Tunisair', value: 'TU' },
        { label: 'Libyan Airlines', value: 'LN' },
        { label: 'Air Zimbabwe', value: 'UM' },
        { label: 'Air Mauritius', value: 'MK' },
        { label: 'Air Seychelles', value: 'HM' },
        { label: 'Arik Air', value: 'W3' },
        { label: 'Fastjet', value: 'FN' },
        { label: 'Kulula.com', value: 'MN' },
        { label: 'Jambojet', value: 'JM' },
        { label: 'FlySafair', value: 'FA' },
        { label: 'TUI Airways', value: 'BY' },
    { label: 'Condor', value: 'DE' },
    { label: 'SunExpress', value: 'XQ' },
    { label: 'Pegasus Airlines', value: 'PC' },
    { label: 'Jet2.com', value: 'LS' },
    { label: 'Norwegian Air International', value: 'D8' },
    { label: 'Aer Lingus', value: 'EI' },
    { label: 'Virgin Australia', value: 'VA' },
    { label: 'Tigerair Australia', value: 'TT' },
    { label: 'Scoot', value: 'TR' },
    { label: 'SilkAir', value: 'MI' },
    { label: 'Air Astana', value: 'KC' },
    { label: 'AirAsia X', value: 'D7' },
    { label: 'Bamboo Airways', value: 'QH' },
    { label: 'Jeju Air', value: '7C' },
    { label: 'Jin Air', value: 'LJ' },
    { label: 'Spring Airlines', value: '9C' },
    { label: 'Shenzhen Airlines', value: 'ZH' },
    { label: 'Xiamen Air', value: 'MF' },
    { label: 'Hong Kong Airlines', value: 'HX' },
    { label: 'Scoot Tigerair', value: 'TR' },
    { label: 'Bangkok Airways', value: 'PG' },
    { label: 'Vietnam Bamboo Airways', value: 'QH' },
    { label: 'Peach Aviation', value: 'MM' },
    { label: 'VietJet Air', value: 'VJ' },
    { label: 'Air Macau', value: 'NX' },
    { label: 'China West Air', value: 'PN' },
    { label: 'China Southern Xpress', value: 'CZ' },
    { label: 'Air Busan', value: 'BX' },
    { label: 'T’way Air', value: 'TW' },
    { label: 'Asiana Wings', value: 'OZ' },
    { label: 'Kam Air', value: 'RQ' },
    { label: 'Ariana Afghan Airlines', value: 'FG' },
    { label: 'Air Arabia Egypt', value: 'E5' },
    { label: 'Jazeera Airways', value: 'J9' },
    { label: 'Flynas', value: 'XY' },
    { label: 'Saudia Cargo', value: 'SV' },
    { label: 'Middle East Airlines', value: 'ME' },
    { label: 'Tarom', value: 'RO' },
    { label: 'Blue Air', value: '0B' },
    { label: 'Wizz Air Hungary', value: 'W6' },
    { label: 'Wizz Air Abu Dhabi', value: '5W' },
    { label: 'Ryanair UK', value: 'RK' },
    { label: 'Play Airlines', value: 'OG' },
    { label: 'Icelandair', value: 'FI' },
    { label: 'Air Greenland', value: 'GL' },
    { label: 'Air Tahiti Nui', value: 'TN' },
    { label: 'French Bee', value: 'BF' },
    { label: 'Corsair International', value: 'SS' },
    { label: 'Transavia', value: 'HV' },
    { label: 'Neos', value: 'NO' },
    { label: 'Aigle Azur', value: 'ZI' },
    { label: 'Air Italy', value: 'IG' },
    { label: 'LEVEL', value: 'IB' },
    { label: 'Volaris', value: 'Y4' },
    { label: 'Interjet', value: '4O' },
    { label: 'Aeromar', value: 'VW' },
    { label: 'Azul Brazilian Airlines', value: 'AD' },
    { label: 'GOL Linhas Aéreas', value: 'G3' },
    { label: 'LATAM Brasil', value: 'JJ' },
    { label: 'Sky Airline', value: 'H2' },
    { label: 'JetSMART', value: 'JA' },
    { label: 'Star Perú', value: '2I' },
    { label: 'Copa Airlines', value: 'CM' },
    { label: 'Caribbean Airlines', value: 'BW' },
    { label: 'LIAT', value: 'LI' },
    { label: 'Bahamasair', value: 'UP' },
    { label: 'Cubana de Aviación', value: 'CU' },
    { label: 'Aero República', value: 'P5' },
    { label: 'Aerolíneas Argentinas', value: 'AR' },
    { label: 'Boliviana de Aviación', value: 'OB' },
    { label: 'Viva Air', value: 'VH' },
    { label: 'EcoJet', value: '8J' },
    { label: 'Binter Canarias', value: 'NT' },
    { label: 'Air Malta', value: 'KM' },
    { label: 'LOT Polish', value: 'LO' },
    { label: 'Croatia Airlines', value: 'OU' },
    { label: 'Air Serbia', value: 'JU' },
    { label: 'Montenegro Airlines', value: 'YM' },
    { label: 'Belavia', value: 'B2' },
    { label: 'Ukraine International Airlines', value: 'PS' },
    { label: 'Georgian Airways', value: 'A9' },
    { label: 'Azerbaijan Airlines', value: 'J2' },
    { label: 'Uzbekistan Airways', value: 'HY' },
    { label: 'Air India Express', value: 'IX' },
    { label: 'GoAir', value: 'G8' },
    { label: 'Air Peace', value: 'P4' },
    { label: 'Dana Air', value: '9J' },
    { label: 'Africa World Airlines', value: 'AW' },
    { label: 'ASKY Airlines', value: 'KP' },
    { label: 'RwandAir Express', value: 'WB' },
    { label: 'Precision Air', value: 'PW' },
    { label: 'Fastjet Zimbabwe', value: 'FN' },
    { label: 'Namibia Airways', value: 'SW' }
    ];

    // City options with IATA codes
    cityOptions = [
        { label: 'Lahore', value: 'LHE' },
    { label: 'Dubai', value: 'DXB' },
    { label: 'New York', value: 'JFK' },
    { label: 'London', value: 'LHR' },
    { label: 'Paris', value: 'CDG' },
    { label: 'Los Angeles', value: 'LAX' },
    { label: 'Tokyo', value: 'HND' },
    { label: 'Sydney', value: 'SYD' },
    { label: 'Toronto', value: 'YYZ' },
    { label: 'Berlin', value: 'TXL' },
    { label: 'Madrid', value: 'MAD' },
    { label: 'Singapore', value: 'SIN' },
    { label: 'Hong Kong', value: 'HKG' },
    { label: 'Rome', value: 'FCO' },
    { label: 'Chicago', value: 'ORD' },
    { label: 'Amsterdam', value: 'AMS' },
    { label: 'Bangkok', value: 'BKK' },
    { label: 'Mumbai', value: 'BOM' },
    { label: 'Beijing', value: 'PEK' },
    { label: 'Moscow', value: 'SVO' },
    { label: 'Kuala Lumpur', value: 'KUL' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'San Francisco', value: 'SFO' },
    { label: 'Seoul', value: 'ICN' },
    { label: 'Zurich', value: 'ZRH' },
    { label: 'Vienna', value: 'VIE' },
    { label: 'Miami', value: 'MIA' },
    { label: 'Cairo', value: 'CAI' },
    { label: 'Sao Paulo', value: 'GRU' },
    { label: 'Buenos Aires', value: 'AEP' },
    { label: 'Rio de Janeiro', value: 'GIG' },
    { label: 'Cape Town', value: 'CPT' },
    { label: 'Munich', value: 'MUC' },
    { label: 'Milan', value: 'MXP' },
    { label: 'Barcelona', value: 'BCN' },
    { label: 'New Delhi', value: 'DEL' },
    { label: 'Doha', value: 'DOH' },
    { label: 'Lagos', value: 'LOS' },
    { label: 'Jakarta', value: 'CGK' },
    { label: 'Vancouver', value: 'YVR' },
    { label: 'Montreal', value: 'YUL' },
    { label: 'Frankfurt', value: 'FRA' },
    { label: 'Stockholm', value: 'ARN' },
    { label: 'Oslo', value: 'OSL' },
    { label: 'Copenhagen', value: 'CPH' },
    { label: 'Helsinki', value: 'HEL' },
    { label: 'Hanoi', value: 'HAN' },
    { label: 'Lima', value: 'LIM' },
    { label: 'Porto', value: 'OPO' },
    { label: 'Athens', value: 'ATH' },
    { label: 'Brussels', value: 'BRU' },
    { label: 'Geneva', value: 'GVA' },
    { label: 'Osaka', value: 'KIX' },
    { label: 'Shanghai', value: 'SHA' },
    { label: 'Tel Aviv', value: 'TLV' },
    { label: 'Amman', value: 'AMM' },
    { label: 'Dusseldorf', value: 'DUS' },
    { label: 'Prague', value: 'PRG' },
    { label: 'Lisbon', value: 'LIS' },
    { label: 'Dallas', value: 'DFW' },
    { label: 'Dublin', value: 'DUB' },
    { label: 'Mexico City', value: 'MEX' }
        // Add more cities here as needed
    ];

    // Handle changes in the form fields
    handleChange(event) {
        const field = event.target.name;
        if (field === 'name') {
            this.name = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'phone') {
            this.phone = event.target.value;
        } else if (field === 'departureDate') {
            this.departureDate = event.target.value;
        } else if (field === 'returnDate') {
            this.returnDate = event.target.value;
        }
    }

    // Handle changes in city selection and update city code fields
    handleCityChange(event) {
        const field = event.target.name;
        if (field === 'departureCity') {
            this.departureCity = event.target.value;
            const selectedCity = this.cityOptions.find(city => city.value === this.departureCity);
            this.departureCityCode = selectedCity ? selectedCity.value : '';
        } else if (field === 'arrivalCity') {
            this.arrivalCity = event.target.value;
            const selectedCity = this.cityOptions.find(city => city.value === this.arrivalCity);
            this.arrivalCityCode = selectedCity ? selectedCity.value : '';
        }
    }
    handleAirlineChange(event) {
        const field = event.target.name;
        if (field === 'preferedAirline') {
            this.preferedAirline = event.target.value;
            const selectedAirline = this.preferedAirlineOptions.find(airline => airline.value === this.preferedAirline);
            this.SelectedAirlineCode = selectedAirline ? selectedAirline.value : '';
        }
        }
    

    // Handle form submission (search flights)
    handleSubmit() { 
        // Show loading spinner 
        this.isSearchFlightLoading = true;

        // Simulate an API call to search flights
        setTimeout(() => {
            // Mock flight data (replace this with actual API call in real scenario)
            this.availableFlights = [ 
                {
                    id: 1,
                    airline: 'Emirates',
                    departureCity: this.departureCity,
                    arrivalCity: this.arrivalCity,
                    departureDate: this.departureDate,
                    arrivalDate: this.returnDate,
                    price: '$1000',
                },
                {
                    id: 2,
                    airline: 'Qatar Airways',
                    departureCity: this.departureCity,
                    arrivalCity: this.arrivalCity,
                    departureDate: this.departureDate,
                    arrivalDate: this.returnDate,
                    price: '$950',
                }, 
            ];

            // Hide loading spinner and show available flights
            this.isSearchFlightLoading = false;
        }, 2000); // Simulating 2-second API delay
    }

    // Handle booking a flight
    handleBookNow(event) {
        const flightId = event.target.dataset.id;
        const flight = this.availableFlights.find(f => f.id === flightId);

        // Log flight details (you can replace this with booking logic)
        console.log('Booking flight:', flight);
    }
}
