begin;
delete from proposal;
copy proposal from $/json/;
commit;
