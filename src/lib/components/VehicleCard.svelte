<script lang="ts">
  //TODO template image removal => use files instead
  //TODO handle files

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
  }, clickDelete, clickEdit } = $props();

  let currentDate = new Date();
  let insuranceIcon = $state(currentDate > data.endDateInsurance ? '-remove' : isWithin30Days(data.endDateInsurance, currentDate) ? '-alert' : '');
  let billIcon = $state(currentDate > data.endDateBill ? '-remove' : isWithin30Days(data.endDateBill, currentDate) ? '-alert' : '');
  let revisionIcon = $state(currentDate > data.endDateRevision ? '-remove' : isWithin30Days(data.endDateRevision, currentDate) ? '-alert' : '');

  function formatDate(date: Date){
    return date.toLocaleDateString("it-IT");
  }

  function isWithin30Days(date: Date, currentDate: Date): boolean {
    const differenceInMs = date.getTime() - currentDate.getTime();
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    return differenceInDays <= 30 && differenceInDays >= 0;
  }
</script>

<div id="vehicle-container">
  <div class="row">
    <div class="col-6">
      <!-- TODO remove template image, TODO handle img -->
      <img id="vehicle-image" width="100%" src="https://www.piambellihybrid.it/storage/WhatsApp-Image-2024-07-30-at-15.20.44-3.jpeg" alt="vehicle image" />
      <p>{data.type}</p>
      <p>{data.brand} - {data.model}</p>
      <p>{data.registrationYear}</p>
      <p><b>{data.plateNumber}</b></p>
    </div>
    <div class="col-6 right-col">
      <div class="row">
        <p><b>Expire Dates</b></p>
      </div>
      <div class="row">
        <p><b>Insurance</b></p>
      </div>
      <div class="row">
        {#if data.isInsured}<p>{formatDate(data.endDateInsurance)}</p> <span class="mdi--stopwatch{insuranceIcon}"></span>{:else} <p>Vehicle is not insured</p> {/if}
      </div>
      <div class="row">
        <p><b>Bill</b></p>
      </div>
      <div class="row">
        {#if data.hasBill}<p>{formatDate(data.endDateBill)}</p> <span class="mdi--stopwatch{billIcon}"></span>{:else} <p>Vehicle has no bill</p> {/if}
      </div>
      <div class="row">
        <p><b>Revision</b></p>
      </div>
      <div class="row">
        <p>{formatDate(data.endDateRevision)} </p> <span class="mdi--stopwatch{revisionIcon}"></span>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <!-- TODO handle fiels -->
      <button class="button-minor" id="view-btn">View Files</button>
    </div>
    <div class="col-6">
      <button onclick={clickDelete} class="button-secondary" id="delete-btn">Delete</button>
      <button onclick={clickEdit} id="edit-btn">Edit</button>
    </div>
  </div>
</div>

<style>
  p {
    margin-top: 0;
    margin-bottom: 3px;
    margin-top: 0;
  }
  div.right-col p{
    text-align: center;
  }
  div.right-col div.row {
    position: relative;
  }
  div.right-col div.row span {
    position: absolute;
    right: 10px;
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
  .mdi--stopwatch {
  width: 24px;
  height: 24px;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m19.03 7.39l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0 0 18c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M13 14h-2V7h2zm2-13H9v2h6z'/%3E%3C/svg%3E");
  background-color: var(--color-success);
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
.mdi--stopwatch-alert {
  width: 24px;
  height: 24px;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M18.45 5.97c-.45-.51-.9-.97-1.41-1.41L15.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0 0 18c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM11 14H9V7h2zm2-11H7V1h6zm10 4v6h-2V7zm-2 8h2v2h-2z'/%3E%3C/svg%3E");
  background-color: var(--color-alert);
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
.mdi--stopwatch-remove {
  width: 24px;
  height: 24px;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M15 3H9V1h6zm-2 16c0 1.03.26 2 .71 2.83c-.55.11-1.12.17-1.71.17a9 9 0 0 1 0-18c2.12 0 4.07.74 5.62 2l1.42-1.44c.51.44.96.9 1.41 1.41l-1.42 1.42A8.96 8.96 0 0 1 21 13v.35c-.64-.22-1.3-.35-2-.35c-3.31 0-6 2.69-6 6m0-12h-2v7h2zm9.54 9.88l-1.42-1.41L19 17.59l-2.12-2.12l-1.41 1.41L17.59 19l-2.12 2.12l1.41 1.42L19 20.41l2.12 2.13l1.42-1.42L20.41 19z'/%3E%3C/svg%3E");
  background-color: var(--color-error);
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>
