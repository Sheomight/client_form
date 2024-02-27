<template>
  <div class="container">
    <form @submit.prevent="createClient" >
    <h2>Добавить нового клиента</h2>
    <fieldset>
      <legend>Информация о клиенте</legend>
      <div>
        <CustomInput 
        id="last-name" 
        label="Фамилия" 
        v-model.trim="$v.lastName.$model" 
        :required="true" 
        :invalid="$v.lastName.$error"
        placeholder="Иванов"
        />
        <small v-if="$v.lastName.$error" class="error-info">Пожалуйста введите фамилию</small>
      </div>
      <div>
        <CustomInput 
        id="name" 
        label="Имя" 
        v-model.trim="$v.name.$model" 
        :required="true" 
        :invalid="$v.name.$error"
        placeholder="Иван"
        />
        <small v-if="$v.name.$error" class="error-info">Пожалуйста введите имя</small>
      </div>
      <CustomInput 
      id="patronymic" 
      label="Отчество" 
      v-model.trim="patronymic"
      placeholder="Иванович"
      />
      <div>
        <CustomDate 
        id="birthday" 
        label="Дата рождения" 
        v-model="$v.birthDate.$model" 
        :required="true"
        :invalid="$v.birthDate.$error" 
        />
        <small v-if="$v.birthDate.$error" class="error-info">Пожалуйста укажите дату рождения</small>
      </div>
      <div>
        <CustomInput 
        id="phone" 
        label="Номер телефона" 
        placeholder="7 xxx xxx xx xx" 
        v-model.trim="$v.phoneNumber.$model"
        type="tel" 
        :maxlength="11" 
        :required="true" 
        :invalid="$v.phoneNumber.$error" 
        />
        <small v-if="$v.phoneNumber.$dirty && $v.phoneNumber.startWithSeven === false" class="error-info">Номер телефона должен начинаться с 7</small>
        <small v-else-if="$v.phoneNumber.$dirty && $v.phoneNumber.minLength === false" class="error-info">В номере телефона должно быть 11 цифр</small>
      </div>
      <CustomSelect 
      id="sex" 
      label="Пол" 
      v-model="sex" 
      :options="sexList" 
      />
      <div>
        <CustomSelect 
        id="client-group" 
        label="Группы клиента" 
        v-model="$v.clientGroups.$model" 
        :options="groupsList"
        :multiple="true" 
        :required="true" 
        :invalid="$v.clientGroups.$error"
        />
        <small v-if="$v.clientGroups.$error" class="error-info">Укажите группу(ы) клиента</small>
      </div>
      <CustomSelect 
      id="doctor" 
      label="Лечащий врач" 
      v-model="attendingDoctor" 
      :options="doctorsList" 
      />
      <CustomCheckbox 
      id="sms-send" 
      label="Не отправлять СМС" 
      v-model="doNotSendSms" 
      />
    </fieldset>
    <fieldset>
      <legend>Адрес</legend>
      <CustomInput 
      id="zip" 
      label="Индекс" 
      v-model.trim="zip" 
      type="number"
      placeholder="111222"
      />
      <CustomInput 
      id="country" 
      label="Страна" 
      v-model.trim="country"
      placeholder="Россия"
      />
      <CustomInput 
      id="region" 
      label="Область" 
      v-model.trim="region"
      placeholder="Московская область"
      />
      <div>
        <CustomInput 
        id="city" 
        label="Город" 
        v-model.trim="$v.city.$model" 
        :required="true"
        :invalid="$v.city.$error"
        placeholder="Москва"
        />
        <small v-if="$v.city.$error" class="error-info">Укажите город проживания клиента</small>
      </div>
      <CustomInput 
      id="street" 
      label="Улица" 
      v-model.trim="street"
      placeholder="Пушкина"
      />
      <CustomInput 
      id="house" 
      label="Дом" 
      v-model.trim="house"
      placeholder="13"
      />
    </fieldset>
    <fieldset>
      <legend>Паспорт</legend>
      <div>
        <CustomSelect 
        id="document" 
        label="Тип документа" 
        v-model="$v.documentType.$model" 
        :options="documentTypesList"
        :required="true"
        :invalid="$v.documentType.$error"
        />
        <small v-if="$v.documentType.$error" class="error-info">Выберите тип документа</small>
      </div>
      <CustomInput 
      id="series" 
      label="Серия" 
      v-model.trim="series"
      placeholder="1234"
      />
      <CustomInput 
      id="number" 
      label="Номер" 
      v-model.trim="docNumber"
      placeholder="223344"
      />
      <CustomInput 
      id="issuedBy" 
      label="Кем выдан" 
      v-model.trim="issuedBy"
      placeholder="Отделом МВД России"
      />
      <div>
        <CustomDate 
        id="issueDate" 
        label="Дата выдачи" 
        v-model="$v.issueDate.$model" 
        :required="true" 
        :invalid="$v.issueDate.$error"
        />
        <small v-if="$v.issueDate.$error" class="error-info">Укажите дату выдачи документа</small>
      </div>
    </fieldset>
    <small>Поля отмеченные * обязательны для заполнения</small>
    <input type="submit" class="submit-btn" value="Добавить пользователя">
  </form>
  <ModalWindow :show="modalVisible" @hide="hideModal" />
  </div>
</template>

<script>
import CustomInput from '@/components/UI/CustomInput.vue';
import CustomSelect from '@/components/UI/CustomSelect.vue';
import CustomCheckbox from '@/components/UI/CustomCheckbox.vue';
import CustomDate from '@/components/UI/CustomDate.vue';
import ModalWindow from '@/components/UI/ModalWindow.vue'

import { required, maxLength } from 'vuelidate/lib/validators'
export default {
  components: {
    CustomInput,
    CustomSelect,
    CustomCheckbox,
    CustomDate,
    ModalWindow
  },
  data() {
    return {
      modalVisible: false,
      lastName: '',
      name: '',
      patronymic: '',
      birthDate: null,
      phoneNumber: '',
      sex: null,
      clientGroups: null,
      attendingDoctor: null,
      doNotSendSms: false,
      zip: '',
      country: '',
      region: '',
      city: '',
      street: '',
      house: '',
      documentType: '',
      series: '',
      docNumber: '',
      issuedBy: '',
      issueDate: null,
      sexList: [
        {
          value: 'male',
          text: 'Мужской'
        },
        {
          value: 'female',
          text: 'Женский'
        }
      ],
      groupsList: [
        {
          value: 'VIP',
          text: 'VIP'
        },
        {
          value: 'problematic',
          text: 'Проблемные'
        },
        {
          value: 'CMI',
          text: 'ОМС'
        }
      ],
      doctorsList: [
        {
          value: 'Ivanov',
          text: 'Иванов'
        },
        {
          value: 'Zaharov',
          text: 'Захаров'
        },
        {
          value: 'Chernisheva',
          text: 'Чернышёва'
        }
      ],
      documentTypesList: [
        {
          value: 'passport',
          text: 'Паспорт'
        },
        {
          value: 'birth-certificate',
          text: 'Свидетельство о рождении'
        },
        {
          value: 'driver-license',
          text: 'Вод. удостоверение'
        }
      ]
    }
  },
  validations() {
    return {
      lastName: { required },
      name: { required },
      birthDate: { required },
      phoneNumber: {
        required,
        maxLength: maxLength(11),
        startWithSeven: value => value[0] == '7'
      },
      clientGroups: { required },
      city: { required },
      documentType: { required },
      issueDate: { required }
    }
  },
  methods: {
    createClient() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const newClient = {
        lastName: this.lastName,
        name: this.name,
        patronymic: this.patronymic,
        birthDate: this.birthDate,
        phoneNumber: this.phoneNumber,
        sex: this.sex,
        clientGroups: this.clientGroups,
        attendingDoctor: this.attendingDoctor,
        doNotSendSms: this.doNotSendSms,
        zip: this.zip,
        country: this.country,
        region: this.region,
        city: this.city,
        street: this.street,
        house: this.house,
        documentType: this.documentType,
        series: this.series,
        docNumber: this.docNumber,
        issuedBy: this.issuedBy,
        issueDate: this.issuedBy
      }

      console.log(newClient)

      
      this.$v.$reset()
      this.clearFields()
      this.modalVisible = true
    },
    hideModal() {
      this.modalVisible = false
    },
    clearFields() {
      this.lastName = ''
      this.name = ''
      this.patronymic = ''
      this.birthDate = null
      this.phoneNumber = ''
      this.sex = null
      this.clientGroups = []
      this.attendingDoctor = null
      this.doNotSendSms = false
      this.zip = ''
      this.country = ''
      this.region = ''
      this.city = ''
      this.street = ''
      this.house = ''
      this.documentType = ''
      this.series = ''
      this.docNumber = ''
      this.issuedBy = ''
      this.issueDate = null

    }
  }
}
</script>