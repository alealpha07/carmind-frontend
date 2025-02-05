<script lang="ts">
  let { data = {
    type: "",
    brand: "",
    model: "",
    registrationYear: 0,
    plateNumber: "",
    isInsured: false,
    startDateInsurance: new Date(),
    endDateInsurance: new Date(),
    hasBill: false,
    endDateBill: new Date(),
    endDateRevision: new Date(),
    //TODO handle files
  } } = $props();


  function formatDate(date: Date){
    return date.toLocaleDateString("it-IT");
  }

</script>

<div id="vehicle-container">
  <div class="row">
    <div class="col-6">
      <!-- TODO remove template image, TODO handle img -->
      <img id="vehicle-image" width="100%" src="https://www.piambellihybrid.it/storage/WhatsApp-Image-2024-07-30-at-15.20.44-3.jpeg" alt="vehicle image" />

      <p>{data.type}</p>
      <p>{data.brand} - {data.model}</p>
      <p><b>{data.plateNumber}</b></p>
    </div>
    <div class="col-6 right-col">
      <p><b>Expire Dates</b></p>
      <p><b>Insurance</b> <br> {#if data.isInsured}{formatDate(data.endDateInsurance)}{:else} <p>Vehicle is not insured</p> {/if}</p>
      <p><b>Bill</b> <br>{#if data.hasBill}{formatDate(data.endDateInsurance)}{:else} <p>Vehicle has no bill</p> {/if}</p>
      <p><b>Revision</b> <br>{formatDate(data.endDateInsurance)}</p>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <!-- TODO handle fiels -->
      <button class="button-minor" id="view-btn">View Files</button>
    </div>
    <div class="col-6">
      <button class="button-secondary" id="delete-btn">Delete</button>
      <button id="edit-btn">Edit</button>
    </div>
  </div>
</div>

<style>
  p {
    margin-top: 0;
    margin-bottom: 3px;
    margin-top: 0;
  }

  div.right-col > p{
    text-align: center;
  }
  
	#vehicle-container{
    width: 300px;
    height: 300px;
    background-color: var(--color-bg-3);
    border-radius: 15px;
    box-shadow: 10px 10px 10px var(--color-bg-5);
    padding: 15px;
    position: relative;
    
  }
  #view-btn{
    position: absolute;
    bottom: 15px;
    left: 15px;
  }
  #edit-btn{
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
  #delete-btn{
    position: absolute;
    bottom: 15px;
    right: 75px;
  }
  #vehicle-image{
    border-radius: 10px;
  }
</style>
