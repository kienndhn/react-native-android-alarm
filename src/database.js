import Realm from "realm";
import { ObjectId } from 'bson'
const AlarmSchema = {
    name: 'Alarm',
    properties: {
        _id: 'ObjectId',
        name: 'string',
        active: 'int'
    },
    primaryKey: '_id',
}

export const initSchema = async () => {
    try {
        const realm = await Realm.open({
            path: 'myrealm',
            schema: [
                AlarmSchema
            ]
        });
    }
    catch (error) {
        console.log('[error init realm: ]', error);
    }
}

export const insertSchema = async payload => {
    try {
        const realm = await Realm.open({
            path: 'myrealm',
            schema: [
                AlarmSchema
            ]
        })

        let res;
        await realm.write(() => {
            res = realm.create('AlarmSchema', {
                ...payload,
                _id: new ObjectId()
            })
        })

        console.log('[insert success data]: ');
        return res;
    }
    catch (error) {
        console.log('[insert error]: ', error);
    }
}

export const getData = async payload => {
    try {
        const realm = await Realm.open({
            path: 'myrealm',
            schema: [AlarmSchema]

        })

        const res = realm.objects('AlarmSchema');
        console.log('[get data success]');
        return res;
    } catch (error) {
        console.log('[get data error]: ', error);
        return [];
    }
}

export const getDataById = async payload => {
    try {
        const realm = await Realm.open({
            path: 'myrealm',
            schema: [AlarmSchema]

        })

        const ob = realm.objectForPrimaryKey(
            'AlarmSchema',
            new ObjectId(payload.data._id),
        )

        console.log('[get data success]');
        return ob;
    } catch (error) {
        console.log('[get data error]: ', error);
        return null
    }
}

export const deteleDataById = async payload => {
    try {
        const realm = await Realm.open({
            path: 'myrealm',
            schema: [AlarmSchema],
        })
        realm.write(() => {
            const ob = realm.objectForPrimaryKey('AlarmSchema', payload.data._id)
            realm.delete(ob)
            console.log('[delete success]');
        })
    } catch (error) {
        console.log('[delete error]: ', error);
    }
}

export const updateDataById = async payload => {
    try {
        const realm = await Realm.open({
            path: 'myrealm',
            schema: [
                AlarmSchema
            ],
        });
        realm.write(() => {
            const ob = realm.objectForPrimaryKey(
                'AlarmSchema',
                new ObjectId(payload.data._id),
            );
            if (ob) {
                for (const property in ob) {
                    if (property != '_id') {
                        ob[property] = payload.data[property];
                    }
                }
                console.log("[ UPDATE SUCCESS ]");
            }
            return ob;
        });
    } catch (error) {
        console.log("[ ERROR UPDATE SCHEMA ]");
    }
};
export const updatePropertySchemasById = async payload => {
    try {
        const realm = await Realm.open({
            path: 'myrealm',
            schema: [
                AlarmSchema
            ],
        });
        realm.write(() => {
            const ob = realm.objectForPrimaryKey(
                payload.schema_name,
                new ObjectId(payload.data._id),
            );
            if (ob) {
                for (const property in ob) {
                    if (property != '_id') {
                        ob[property] = payload.data[property];
                    }
                }
            }
            console.log("[ UPDATE HOME SUCCESS ]", ob);
            return ob;
        });
    } catch (error) {
        console.log("[ ERROR UPDATE HOME TO DB ]");
    }
};

export const resetDatabase = async () => {
    try {
        const realm = await Realm.open({
            path: 'myrealm',
            schema: [
                AlarmSchema
            ],
        });
        await realm.write(() => {
            realm.deleteAll();
        });
        console.log(" [ RESSET DB SUCCESS ] ");
    } catch (error) {
        console.log(" [ RESSET DB ERROR ] ", error);
    }
};