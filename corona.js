class Corona {
  async getData() {
    const res = await fetch(
      // "https://corona.lmao.ninja/v2/historical/usacounties/iowa"

      "https://disease.sh/v2/historical/usacounties/iowa?lastdays=30"
    );

    const data = await res.json();
    return data;
  }

  async getCounties() {
    const res = await fetch(
      "https://covid19.mathdro.id/api/countries/USA/confirmed"
    );

    const data = await res.json();
    return data;
  }
}
