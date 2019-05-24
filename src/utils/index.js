import moment from 'moment'

export function formatDateTime(datetime, format = 'DD.MM.YYYY HH:mm') {
  return moment(datetime).format(format)
}
