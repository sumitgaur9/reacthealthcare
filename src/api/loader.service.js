import { Subject } from 'rxjs';

const subject = new Subject();


export const LoaderService = {
    loaderState: () => subject.asObservable(),

    show: () => subject.next({ show: true }),
    hide: () => subject.next({ show: false }),

   
};